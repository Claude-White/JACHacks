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
      fetch(
        `http://localhost:8888/message/${className}/${user.username}/${inputMsg}`
      )
        .then((res) => res.json())
        .then((data) => {
          setConversation((prevConversation) => [...prevConversation, data]);
          setInputMsg("");
        });
    }
  }

  return (
    <main className="h-full">
      <Header />
      <div
        className="p-4 pt-16 mx-10 mb-32 text-white bg-gray-700 rounded-lg min-h-[88%] chat-container"
        ref={chatContainerRef}>
        {conversation.map((item, index) => (
          <div key={index}>
            <div className="chat chat-end grid-rows-[1fr_20px]">
              <div className="p-4 my-3 chat-bubble">{item.input}</div>
              <div className="col-span-2 row-span-2 text-sm">
                {item.messageDate}
              </div>
            </div>

            <div className="chat chat-start grid-rows-[1fr_20px]">
              <div className="p-4 my-3 chat-bubble">{item.output}</div>
              <div className="col-span-2 row-span-2 text-sm">
                {item.messageDate}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed flex items-center justify-center w-full p-4 bottom-4">
        <input
          type="text"
          className="input input-bordered input-primary w-[50%] m-3"
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
    </main>
  );
}
