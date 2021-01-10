import React, { useEffect, useState } from "react";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import SidebarChats from "./SidebarChats";
import db from "../firebase";

function ChatList() {
  const dispatch = useDispatch();
  const [rooms, setrooms] = useState(db.collection("rooms"));
  const [chatList, setchatList] = useState([]);
  let uid = useSelector((state) => state.login.user.uid);
  useEffect(() => {
    db.collection("userRooms")
      .where("uid", "==", uid)
      .onSnapshot((snapshot) => {
        setchatList(
          snapshot.docs.map((doc) => {
            return { id: doc.id, data: doc.data() };
          })
        );
      });
  }, [rooms, uid]);

  return (
    <div style={{ padding: "15px 15px" }}>
      <NavTitle title="chats" />
      {chatList.length !== 0 ? (
        chatList.map((chat) => <SidebarChats key={chat.id} chat={chat} />)
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "15px 0px",
          }}
        >
          Search someone to chat with
        </div>
      )}
    </div>
  );
}

export default ChatList;
