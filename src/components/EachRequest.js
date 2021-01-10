import React, { useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import db from "../firebase";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

function EachRequest({ requestdetail }) {
  const [rooms, setrooms] = useState(db.collection("rooms"));
  const onUpdateStatus = (status, friendrequest) => {
    console.log(friendrequest);
    rooms
      .doc(friendrequest.id)
      .update({
        status: status,
      })
      .then(function (docRef) {
        let userRooms = db.collection("userRooms");
        if (status === "accepted") {
          userRooms.add({
            uid: friendrequest.newDoc.from.uid,
            roomId: friendrequest.id,
          });
          userRooms.add({
            uid: friendrequest.newDoc.to.uid,
            roomId: friendrequest.id,
          });
        }
      })
      .catch(function (error) {
        // The document probably doesn't exist.
      });
  };
  const showIcons = (friendrequest) => {
    return (
      <div>
        <div
          className="request"
          onClick={() => onUpdateStatus("accepted", friendrequest)}
        >
          <CheckIcon />
        </div>
        <div
          className="request"
          onClick={() => onUpdateStatus("rejected", friendrequest)}
        >
          <ClearIcon />
        </div>
      </div>
    );
  };
  return (
    <div className="emailResults">
      <div className="emailIcon">
        <AccountCircleIcon />
      </div>
      <div className="emailAddress" style={{ flex: 1 }}>
        <div
          style={{
            fontSize: ".9375rem",
          }}
        >
          {`${requestdetail.newDoc.from.email} `}
          <span
            style={{
              color: "grey",
            }}
          >
            {requestdetail.newDoc.status === "requested"
              ? "Has requested to be your friend"
              : "Friends"}
          </span>
        </div>
      </div>
      {showIcons(requestdetail)}
    </div>
  );
}

export default EachRequest;
