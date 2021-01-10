import React from "react";
import "./Chat.css";
import ChatRoom from "./ChatRoom";
import { useDispatch, useSelector } from "react-redux";

const Chat = () => {
  let selectedChat = useSelector((state) => state.selectChat.selectedChat);
  return (
    <div className="chat">
      {selectedChat ? (
        <ChatRoom chatInfo={selectedChat} />
      ) : (
        <div
          style={{
            color: "#bbb7b7",
            fontSize: "30px",
          }}
        >
          Please select a chat to continue
        </div>
      )}
    </div>
  );
};

export default Chat;
