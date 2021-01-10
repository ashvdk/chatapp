import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useSelector } from "react-redux";

import NavTitle from "./NavTitle";
import EachRequest from "./EachRequest";

const FriendRequest = () => {
  const [rooms, setrooms] = useState(db.collection("rooms"));
  const [friendrequests, setfriendrequests] = useState([]);
  let uid = useSelector((state) => state.login.user.uid);
  useEffect(() => {
    rooms
      .where("status", "==", "requested")
      .where("to.uid", "==", uid)
      .onSnapshot((snapshot) => {
        // let friendRequest = [];
        setfriendrequests(
          snapshot.docs.map(function (doc) {
            return { id: doc.id, newDoc: doc.data() };
          })
        );
        // let allFriendRequests = [...friendrequests, ...friendRequest];
        // setfriendrequests(allFriendRequests);
      });
  }, [rooms, uid]);

  const showFriendRequest = () => {
    return friendrequests.map((friendrequest) => (
      <EachRequest key={friendrequest.id} requestdetail={friendrequest} />
    ));
  };
  return (
    <div
      style={{
        padding: "15px 15px",
      }}
    >
      <NavTitle title="Requests" />
      {friendrequests.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "15px 0px",
          }}
        >
          No requests yet
        </div>
      ) : (
        showFriendRequest()
      )}
    </div>
  );
};

export default FriendRequest;
