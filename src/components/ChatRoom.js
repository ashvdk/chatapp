import React, { Fragment, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import axios from "axios";
import ChatRoomBody from "./ChatRoomBody";
import db from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

const ChatRoom = ({ chatInfo }) => {
  let user = useSelector((state) => state.login.user);
  const [message, setMessage] = useState("");
  const onMessageSend = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(chatInfo.roomId)
      .collection("messages")
      .add({
        message,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        },
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function (docRef) {
        // chatBodyRef.current.scrollTo(0, chatBodyRef.current.height);
        document
          .getElementsByClassName("allmessageshow")[0]
          .scrollTo(
            0,
            document.getElementsByClassName("allmessageshow")[0].scrollHeight
          );
        setMessage("");
      });
  };
  return (
    <Fragment>
      <div className="chat__header">
        <div className="chat__headerInfo">
          <h3 style={{ color: "black" }}>
            {chatInfo.detailsOfFriend.displayName}
          </h3>
          <div
            style={{
              fontWeight: "100",
              fontSize: "13px",
              marginTop: "5px",
              color: "#bebebe",
            }}
          >
            last seen today at 11:07 AM
          </div>
        </div>
      </div>

      <ChatRoomBody roomId={chatInfo.roomId} />

      <div className="chat__footer">
        <form>
          <input
            type="text"
            placeholder="Type a message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={onMessageSend}>
            Send message
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
