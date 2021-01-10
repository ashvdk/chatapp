import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import db from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import ChatIcon from "@material-ui/icons/Chat";
import SearchByEmail from "./SearchByEmail";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { auth } from "../firebase";
import FriendRequest from "./FriendRequest";
import Badge from "@material-ui/core/Badge";
import ChatList from "./ChatList";

const Sidebar = (props) => {
  const rooms = db.collection("rooms");
  const [friendRequestCount, setfriendRequestCount] = useState(0);
  const [route, setRoute] = useState("chat");
  const dispatch = useDispatch();
  let user = useSelector((state) => state.login.user);
  useEffect(() => {
    const unsubscribe = rooms
      .where("status", "==", "requested")
      .where("to.uid", "==", user.uid)
      .onSnapshot((snapshot) => {
        setfriendRequestCount(snapshot.size);
        let friendRequest = [];
        snapshot.docChanges().forEach(function (change) {
          console.log("change");
          friendRequest.push({ id: change.doc.id, newDoc: change.doc.data() });
        });
      });
    return () => {
      unsubscribe();
    };
  }, [rooms, user.uid]);
  const setRoutes = () => {
    switch (route) {
      case "chat":
        return <ChatList />;
      case "search":
        return <SearchByEmail />;
      case "requests":
        return <FriendRequest />;
      default:
        return <ChatList />;
    }
  };
  const chooseRoute = (status) => {
    setRoute(status);
  };
  return (
    <div className="sidebar">
      <div className="sidebar__options">
        <div
          style={{ color: route === "chat" ? "#1a73e8" : "" }}
          className="navitem"
          onClick={() => chooseRoute("chat")}
        >
          <ChatIcon />
        </div>
        <div
          style={{ color: route === "search" ? "#1a73e8" : "" }}
          className="navitem"
          onClick={() => chooseRoute("search")}
        >
          <SearchIcon />
        </div>
        <div
          style={{ color: route === "requests" ? "#1a73e8" : "" }}
          className="navitem"
          onClick={() => chooseRoute("requests")}
        >
          <Badge badgeContent={friendRequestCount} color="primary">
            <NotificationsIcon />
          </Badge>
        </div>
        <div
          style={{ marginTop: "auto" }}
          className="navitem"
          onClick={() =>
            auth.signOut().then(
              function () {
                dispatch({ type: "logout", payload: null });
              },
              function (error) {}
            )
          }
        >
          <ExitToAppIcon />
        </div>
      </div>
      <div className="sidebar__chats">{setRoutes()}</div>
    </div>
  );
};

export default Sidebar;
