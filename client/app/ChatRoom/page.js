"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import { useUser } from "@clerk/clerk-react";
import { useSearchParams } from "next/navigation";

export default function ChatRoom() {
  const searchParams = useSearchParams();
  const className = searchParams.get("class");
  const { isSignedIn, user, isLoaded } = useUser();
  const [inputMsg, setInputMsg] = useState("");
  const [conversation, setConversation] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (isLoaded && user && className) {
      fetch(`http://localhost:8888/conversations/${className}/${user.username}`)
        .then((res) => res.json())
        .then((data) => {
          setConversation(data);
        });
    }
  }, [isLoaded, user, className]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [conversation]);

  function getMessage() {
    if (inputMsg.trim() !== "" && isLoaded && className) {
      fetch(`http://localhost:8888/message/${className}/${user.username}/${inputMsg}`)
        .then((res) => res.json())
        .then((data) => {
          setConversation((prevConversation) => [...prevConversation, data]);
          setInputMsg("");
        });
    }
  }

  return (
    <main className="h-screen">
      <div className="drawer h-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Header />
          <div className="chat-container bg-gray-700 text-white p-4 mx-10 min-h-[80vh] overflow-y-auto" ref={chatContainerRef}>
            {conversation.map((item, index) => (
              <div key={index}>
                <div className="chat chat-end">
                  <div className="chat-bubble p-4 my-6">{item.input}</div>
                  {item.messageDate}
                </div>

                <div className="chat chat-start">
                  <div className="chat-bubble p-4">{item.output}</div>
                  {item.messageDate}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 flex justify-center items-center">
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
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-200 text-base-content">
            <Nav />
          </ul>
        </div>
      </div>
    </main>
  );
}
