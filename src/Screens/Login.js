import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import db from "../firebase";

function Login(props) {
  const dispatch = useDispatch();
  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const usersRef = db.collection("users");
        usersRef
          .where("email", "==", result.user.email)
          .get()
          .then(function (querySnapshot) {
            var count = 0;
            querySnapshot.forEach(function (doc) {
              count++;
            });
            if (count === 0) {
              usersRef
                .add({
                  uid: result.user.uid,
                  email: result.user.email,
                  displayName: result.user.displayName,
                })
                .then(function (docRef) {
                  dispatch({ type: "login", payload: result.user });
                })
                .catch(function (error) {});
            } else {
              dispatch({ type: "login", payload: result.user });
            }
          })
          .catch(function (error) {});
      })
      .catch((err) => alert(err));
  };
  // admin.auth().g
  return (
    <div>
      <Button variant="contained" color="primary" onClick={login}>
        SIGN WITH GOOGLE TO CHAT
      </Button>
    </div>
  );
}

export default Login;
