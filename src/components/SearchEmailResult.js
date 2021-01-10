import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useSelector } from "react-redux";
import db from "../firebase";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

function SearchEmailResult({ result }) {
  const [requestReceived, setrequestReceived] = useState(null);
  const [requestRaised, setrequestRaised] = useState(false);
  const [roomId, setroomId] = useState(null);
  const [rooms, setrooms] = useState(db.collection("rooms"));
  const [roomStatus, setroomStatus] = useState(null);
  let user = useSelector((state) => state.login.user);

  console.log("rerendering");
  useEffect(() => {
    rooms
      .where("from.uid", "==", result.uid)
      .where("to.uid", "==", user.uid)
      .onSnapshot((snapshot) => {
        let count = 0;
        snapshot.docChanges().forEach(function (change) {
          setroomId(change.doc.id);
          setrequestReceived(true);
          setroomStatus(change.doc.data().status);
          count++;
        });
        if (count === 0) {
          rooms
            .where("from.uid", "==", user.uid)
            .where("to.uid", "==", result.uid)
            .onSnapshot((snapshot) => {
              let count = 0;
              snapshot.docChanges().forEach(function (change) {
                setroomId(change.doc.id);
                setrequestRaised(true);
                setroomStatus(change.doc.data().status);
                count++;
              });
            });
        }
      });
  }, []);
  const onUpdateStatus = (status) => {
    rooms
      .doc(roomId)
      .update({
        status: status,
      })
      .then(function (docRef) {
        let userRooms = db.collection("userRooms");
        if (status === "accepted") {
          userRooms.add({
            uid: result.uid,
            roomId: roomId,
          });
          userRooms.add({
            uid: user.uid,
            roomId: roomId,
          });
        }
      })
      .catch(function (error) {
        // The document probably doesn't exist.
      });
  };

  const sendFriendRequest = (friendDoc) => {
    let createRoom = {
      status: "requested",
      from: null,
      to: null,
    };
    let loggedInUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    };
    createRoom.from = {
      ...loggedInUser,
    };
    createRoom.to = {
      ...friendDoc,
    };

    rooms
      .add(createRoom)
      .then(function (docRef) {})
      .catch(function (error) {});
  };
  const showStatus = () => {
    if (roomStatus === "requested") {
      if (requestReceived) {
        return (
          <div
            style={{
              color: "grey",
            }}
          >
            Requested to chat with you
          </div>
        );
      }
      if (requestRaised) {
        return (
          <div
            style={{
              color: "grey",
            }}
          >
            Request raised
          </div>
        );
      }
    } else if (roomStatus === "accepted") {
      return (
        <div
          style={{
            color: "grey",
          }}
        >
          Friends
        </div>
      );
    } else if (roomStatus === "rejected") {
      return (
        <div
          style={{
            color: "grey",
          }}
        >
          Rejected
        </div>
      );
    }
  };
  const showIcons = () => {
    if (roomStatus === "requested") {
      if (requestReceived) {
        return (
          <div>
            <div className="request" onClick={() => onUpdateStatus("accepted")}>
              <CheckIcon />
            </div>
            <div className="request" onClick={() => onUpdateStatus("rejected")}>
              <ClearIcon />
            </div>
          </div>
        );
      }
      if (requestRaised) {
        return <div>{""}</div>;
      }
    } else if (roomStatus === "rejected") {
      return <div>{""}</div>;
    } else if (roomStatus === "accepted") {
      return <div>{""}</div>;
    } else {
      return (
        <div className="sendRequest" onClick={() => sendFriendRequest(result)}>
          <PersonAddIcon />
        </div>
      );
    }
  };
  return (
    <div className="emailResults">
      <div className="emailIcon">
        <AccountCircleIcon />
      </div>
      <div className="emailAddress" style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "18px",
          }}
        >
          {result.email}
        </div>
        {showStatus()}
      </div>
      {showIcons()}
    </div>
  );
}

export default SearchEmailResult;
