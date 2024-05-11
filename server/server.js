import OpenAI from "openai";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = 8888;

const openai = new OpenAI({
  apiKey: "sk-proj-RjXMpwoKyjcT0VgUpOHET3BlbkFJSpH6RtCl6u8YmuvT8BoL",
});

app.use(express.json());

app.get("/message/:msg", async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: req.params.msg }],
    model: "gpt-3.5-turbo",
    stream: true,
  });

  const interval = setInterval(() => {
    res.write(completion.choices[0].message.content);
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    res.end();
  }, 10000);

  fs.readFile(moviesJSON, (err, data) => {
    if (err) {
      throw err;
    } else {
      const 
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
