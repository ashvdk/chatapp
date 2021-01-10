import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ChatMessage({ message }) {
  let uid = useSelector((state) => state.login.user.uid);
  useEffect(() => {
    document
      .getElementsByClassName("allmessageshow")[0]
      .scrollTo(
        0,
        document.getElementsByClassName("allmessageshow")[0].scrollHeight
      );
  }, []);
  return (
    <div
      className={`chat__message ${
        message.user.uid == uid ? "chat__sender" : ""
      }`}
    >
      {message.message}
      <span className="chat__timestamp">{`${new Date().getHours()}:${new Date().getMinutes()}`}</span>
    </div>
  );
}

export default ChatMessage;
