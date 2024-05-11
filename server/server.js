import OpenAI from "openai";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 8888;

const openai = new OpenAI({
  apiKey: "sk-proj-RjXMpwoKyjcT0VgUpOHET3BlbkFJSpH6RtCl6u8YmuvT8BoL",
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "client/public")));

app.get("/message/:msg", async (req, res) => {
  const inputMsg = req.params.msg;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: inputMsg }],
    model: "gpt-3.5-turbo",
  });

  const aiReply = completion.choices[0].message.content;

  const conversation = {
    input: inputMsg,
    output: aiReply,
  };

  fs.readFile("data/conversation.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    let conversations = [];
    if (data) {
      conversations = JSON.parse(data);
    }
    conversations.push(conversation);

    fs.writeFile(
      "data/conversation.json",
      JSON.stringify(conversations, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json(conversation);
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
