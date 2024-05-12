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
    <Header />
    <header className="bg-base-100">
      <h1>EASTER EGG 2</h1>
    </header>
    <div
        className="chat-container bg-gray-700 text-white p-4 mx-10 min-h-[80vh]"
        ref={chatContainerRef}>
        {conversation.map((item, index) => (
            <div key={index}>
                <div className="chat chat-end grid-rows-[1fr_20px]">
                    <div className="chat-bubble p-4 my-3">{item.input}</div>
                    <div className="row-span-2 col-span-2 text-sm">{item.messageDate}</div>
                </div>

                <div className="chat chat-start grid-rows-[1fr_20px]">
                    <div className="chat-bubble p-4 my-3">{item.output}</div>
                    <div className="row-span-2 col-span-2 text-sm">{item.messageDate}</div>
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
</main>
  );
}
