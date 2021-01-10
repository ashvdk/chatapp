import React, { useEffect, useState } from "react";
import "./SidebarChats.css";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";

const SidebarChats = ({ chat }) => {
  const [detailsOfFriend, setdetailsOfFriend] = useState(null);
  let uid = useSelector((state) => state.login.user.uid);
  const { data } = chat;

  useEffect(() => {
    db.collection("userRooms")
      .where("roomId", "==", data.roomId)
      .where("uid", "!=", uid)
      .onSnapshot((snapshot) => {
        let chatNamesUid = snapshot.docs.map((doc) => doc.data().uid);
        if (chatNamesUid[0]) {
          db.collection("users")
            .where("uid", "==", chatNamesUid[0])
            .onSnapshot((snapshot) => {
              setdetailsOfFriend(snapshot.docs.map((doc) => doc.data())[0]);
            });
        }
      });
  }, [data.roomId, uid]);
  const dispatch = useDispatch();
  const selectChat = () => {
    dispatch({
      type: "selectedtochat",
      payload: { roomId: data.roomId, detailsOfFriend: detailsOfFriend },
    });
  };
  return detailsOfFriend ? (
    <div className="navchat" onClick={selectChat}>
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              flex: "1",
              fontSize: "17px",
              fontWeight: "700",
            }}
          >
            {detailsOfFriend ? detailsOfFriend.displayName : ""}
          </div>
          <div
            style={{
              fontSize: "13px",
              position: "relative",
              top: "4px",
              color: "#aab0b7",
            }}
          >
            10:43 pm
          </div>
        </div>
        <div
          style={{
            color: "#707479",
            fontSize: "15px",
          }}
        >
          Hello How are you
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default SidebarChats;
