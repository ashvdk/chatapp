import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import db from "../firebase";

const ChatRoomBody = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const refallmessages = useRef(null);
  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, [roomId]);
  console.log(messages);
  return (
    <div className="chat__body">
      <div className="allmessageshow" ref={refallmessages}>
        {messages.length !== 0
          ? messages.map((message) => (
              <ChatMessage key={message.id} message={message.data} />
            ))
          : ""}
      </div>
    </div>
  );
};

export default ChatRoomBody;
