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

app.get("/message/:class/:diflevel/:username/:msg", async (req, res) => {
  const inputMsg = req.params.msg;
  const username = req.params.username;
  const className = req.params.class;
  const difLevel = req.params.diflevel;

  let conversations = {};
  try {
    const data = await fs.promises.readFile(
      `data/user/${username}_conversations.json`,
      "utf8"
    );
    conversations = JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      conversations = {};
    } else {
      throw err;
    }
  }

  let formattedConversations = "None";

  if (conversations[className]) {
    formattedConversations = conversations[className]
      .map((convo) => `INPUT: "${convo.input}", OUTPUT: "${convo.output}"`)
      .join("; ");
  } else {
    conversations[className] = [];
  }

  const context = `Your duty is to be a teacher of ${className}. You will answer all questions that the user has and also make sure to explain the subjects at an ${difLevel} level for the ${className} subject. 
  You are not allowed to answer questions outside of ${className} topics. There are actually three ai teachers on the website and you are one of them. They include History, Computer Science, and Geography. 
  If they want to learn about either of the teachers specialized subjects, recommend them the proper ai teacher in the website if it is not the current subject being taught. 
  \n Here is all of your previous conversations: ${formattedConversations}`;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: context },
      { role: "user", content: inputMsg },
    ],
    model: "gpt-3.5-turbo",
  });

  const aiReply = completion.choices[0].message.content;

  conversations[className].push({
    input: inputMsg,
    output: aiReply,
    messageDate: new Date().toLocaleString(),
  });
  try {
    await fs.promises.writeFile(
      `data/user/${username}_conversations.json`,
      JSON.stringify(conversations, null, 2)
    );
  } catch (err) {
    throw err;
  }

  res.json({ input: inputMsg, output: aiReply });
});

app.get("/conversations/:class/:username", (req, res) => {
  const className = req.params.class;
  const username = req.params.username;

  if (!fs.existsSync(`data/user/${username}_conversations.json`)) {
    fs.writeFileSync(`data/user/${username}_conversations.json`, "{}");
  }

  fs.readFile(
    `data/user/${username}_conversations.json`,
    "utf8",
    (err, data) => {
      if (err) {
        throw err;
      }

      const conversations = data ? JSON.parse(data) : {};
      const classConversations = conversations[className] || [];
      res.json(classConversations);
    }
  );
});

app.get("/generate-quiz/:class/:username", async (req, res) => {
  const username = req.params.username;
  const className = req.params.class;

  let quizzes = {};
  // try {
  //   const data = await fs.promises.readFile(`data/user/${username}_quizzes.json`, "utf8");
  //   quizzes = JSON.parse(data);
  // } catch (err) {
  //   if (err.code === "ENOENT") {
  //     quizzes = {};
  //   } else {
  //     throw err;
  //   }
  // }
  // if (!quizzes[className]) {
  //   quizzes[className] = [];
  // }

  let conversations = {};
  try {
    const data = await fs.promises.readFile(
      `data/user/${username}_conversations.json`,
      "utf8"
    );
    conversations = JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      conversations = {};
    } else {
      throw err;
    }
  }

  let formattedConversations = "None";

  if (conversations[className]) {
    formattedConversations = conversations[className]
      .map((convo) => `INPUT: "${convo.input}", OUTPUT: "${convo.output}"`)
      .join("; ");
  } else {
    conversations[className] = [];
  }

  const context = `Your task is to create a quiz for ${className}. [{"Type":"SA","Question":"What is the largest planet in our solar system?","Answer":"Jupiter"},{"Type":"MC","Question":"What is the capital of France?","Options":[{"Answer":"Paris","Correct":true},{"Answer":"London","Correct":false},{"Answer":"Berlin","Correct":false},{"Answer":"Madrid","Correct":false}]}]
  Give me 5 questions based on the following information formated like the json above but do not give me the same questions as the examples above: ${formattedConversations}`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: context }],
    model: "gpt-3.5-turbo",
  });
  const aiReply = JSON.parse(completion.choices[0].message.content);
  res.json(aiReply);
  //quizzes[className].push(...quizData);
  // try {
  //   await fs.promises.writeFile(
  //     `data/user/${username}_quizzes.json`,
  //     JSON.stringify(quizzes, null, 2)
  //   );
  // } catch (err) {
  //   throw err;
  // }

  // res.json({
  //   success: true,
  //   message: "Quiz generated and saved successfully.",
  //   filename: `${username}_quizzes.json`,
  // });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
