import OpenAI from "openai";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 8888;

const openai = new OpenAI({
  apiKey: "sk-proj-RjXMpwoKyjcT0VgUpOHET3BlbkFJSpH6RtCl6u8YmuvT8BoL",
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/public")));

app.get("/message/:class/:username/:msg", async (req, res) => {
  const inputMsg = req.params.msg;
  const username = req.params.username;
  const className = req.params.class;

  let conversations = {};
  try {
    const data = await fs.promises.readFile(`data/user/${username}_conversations.json`, "utf8");
    conversations = JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      conversations = {};
    } else {
      throw err;
    }
  }

  const formattedConversations = conversations[className].map((convo) => `INPUT: "${convo.input}", OUTPUT: "${convo.output}"`).join("; ");

  const context = `Your duty is to be a teacher of ${className}. You will answer all questions that the user has and also make sure to explain the subjects at an intermediate level for the ${className} subject.\n Here is all of your previous conversations: ${formattedConversations}`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: context },
      { role: "user", content: inputMsg },
    ],
    model: "gpt-3.5-turbo",
  });

  const aiReply = completion.choices[0].message.content;

  conversations[className].push({ input: inputMsg, output: aiReply, messageDate: new Date().toLocaleString() });
  try {
    await fs.promises.writeFile(`data/user/${username}_conversations.json`, JSON.stringify(conversations, null, 2));
  } catch (err) {
    throw err;
  }

  res.json({ input: inputMsg, output: aiReply });
});

app.get("/conversations/:class/:username", (req, res) => {
  const className = req.params.class;
  const username = req.params.username;

  if(!fs.existsSync(`data/user/${username}_conversations.json`)) {
    fs.writeFileSync(`data/user/${username}_conversations.json`, "{}");
  }

  fs.readFile(`data/user/${username}_conversations.json`, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    const conversations = data ? JSON.parse(data) : {};
    const classConversations = conversations[className] || [];
    res.json(classConversations);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
