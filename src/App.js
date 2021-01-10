import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./Screens/Login";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./firebase";

function App() {
  const dispatch = useDispatch();
  const [selectedChatInfo, setSelectedChatInfo] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch({ type: "login", payload: user });
      } else {
        // No user is signed in.
        dispatch({ type: "login", payload: null });
      }
    });
  }, []);
  let user = useSelector((state) => state.login.user);
  // const [messages, setMessages] = useState([]);
  // const getMessages = async () => {
  //   const response = await axios.get("http://localhost:9000/messages/sync");
  //   setMessages(response.data);
  // };
  // useEffect(() => {
  //   getMessages();
  // }, []);
  // useEffect(() => {
  //   var pusher = new Pusher("2256729c27acaf0877a1", {
  //     cluster: "ap2",
  //   });

  //   var channel = pusher.subscribe("messages");
  //   channel.bind("inserted", function (data) {
  //     setMessages([...messages, data]);
  //   });
  // }, [messages]);
  // console.log(messages);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar selectChat={(sChatInfo) => setSelectedChatInfo(sChatInfo)} />
          <Chat selectedChatInfo={selectedChatInfo} />
        </div>
      )}
    </div>
  );
}

export default App;
