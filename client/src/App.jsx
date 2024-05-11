import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";

function App() {
  //const [aiReply, setAiReply] = useState();
  const [inputMsg, setInputMsg] = useState("");
  const [streamData, setStreamData] = useState("");

  function getMessage() {
    if (inputMsg != undefined) {
      const eventSource = new EventSource(`/message/${inputMsg}`);
      eventSource.onmessage = (event) => {
        setStreamData((prevData) => prevData + event.data + " ");
      };
      return () => {
        eventSource.close();
      };

      // fetch(`/message/${inputMsg}`)
      //   .then((res) => res.text())
      //   .then((data) => {
      //     setAiReply(data);
      //     const conversationData = {
      //       input: inputMsg,
      //       output: data,
      //     };
      //     fetch("/userConversation.json")
      //       .then((res) => res.json())
      //       .then((existingData) => {
      //         const updatedData = {
      //           messages: [
      //             ...existingData.messages,
      //             { message: conversationData },
      //           ],
      //         };

      //         fetch("/userConversation.json", {
      //           method: "PUT",
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //           body: JSON.stringify(updatedData),
      //         });
      //       });
      //   });
    }
  }
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Header />
          <input
            type="text"
            className="input input-bordered"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
          />
          <button className="btn btn-primary" onClick={getMessage}>
            Send
          </button>

          <p>{streamData}</p>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <Nav/>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
