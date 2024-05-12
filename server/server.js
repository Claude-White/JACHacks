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

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: inputMsg }],
    model: "gpt-3.5-turbo",
  });

  const aiReply = completion.choices[0].message.content;

  const conversation = {
    input: inputMsg,
    output: aiReply,
    messageDate: new Date().toLocaleString(),
  };

  fs.readFile(`data/user/${username}_conversations.json`, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    let conversations = {};
    if (data) {
      conversations = JSON.parse(data);
    }

    if (!conversations[className]) {
      conversations[className] = [];
    }
    conversations[className].push(conversation);

    fs.writeFile(`data/user/${username}_conversations.json`, JSON.stringify(conversations, null, 2), (err) => {
      if (err) {
        throw err;
      }
      res.json(conversation);
    });
  });
});

app.get("/conversations/:class/:username", (req, res) => {
  const className = req.params.class;
  const username = req.params.username;

  fs.readFile(`data/user/${username}_conversations.json`, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
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
