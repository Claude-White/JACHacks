import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";

function App() {
  const [inputMsg, setInputMsg] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [conversation, setConversation] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [conversation]);

  function getMessage() {
    if (inputMsg.trim() !== "") {
      fetch(`/message/${inputMsg}`)
        .then((res) => res.json())
        .then((data) => {
          setConversation((prevConversation) => [...prevConversation, data]);
          setInputMsg("");
        });
    }
  }

  return (
    <>
      <div className="drawer h-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content h-full">

        <Header />
      <div className="chat-container h-[80%] bg-gray-700 text-white" ref={chatContainerRef}>
        {conversation.map((item, index) => (
          <div key={index}>
            <p className="user-message">{item.input}</p>
            <p className="ai-message">{item.output}</p>
          </div>
        ))}
      </div>
      <div className="input-container p-4 flex justify-center items-center">
        <input
          type="text"
          className="input input-bordered w-[50%] m-3"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              getMessage();
            }
          }}
        />
        <button className="btn btn-primary" onClick={getMessage}>
          Send
        </button>
      </div>

        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <Nav />
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
