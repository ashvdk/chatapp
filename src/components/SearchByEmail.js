import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import db from "../firebase";
import SearchEmailResult from "./SearchEmailResult";
import NavTitle from "./NavTitle";

function SearchByEmail() {
  const [email, setEmail] = useState("");
  const [searchedEmail, setsearchedEmail] = useState([]);
  const [emailErrorMessage, setemailErrorMessage] = useState(false);

  const searchforemail = (e) => {
    e.preventDefault();
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          setemailErrorMessage(true);
        } else {
          let searchedPeople = [];
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            searchedPeople.push({ id: doc.id, newDoc: doc.data() });
          });
          setsearchedEmail(searchedPeople);
          setemailErrorMessage(false);
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div
      style={{
        padding: "15px 15px",
      }}
    >
      <NavTitle title="Search" />
      {/* search Input field */}
      <div className="sidebar__searchContainer">
        <SearchIcon />
        <form>
          <input
            placeholder="Enter email to search"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={searchforemail}>search</button>
        </form>
      </div>
      {emailErrorMessage ? (
        <div style={{ color: "#fd2e2e", fontWeight: "bold" }}>
          This email does not exist
        </div>
      ) : (
        ""
      )}
      <div
        style={{
          marginTop: "15px",
          fontFamily: "sans-serif",
          color: "#515050",
        }}
      >
        PEOPLE
      </div>

      {searchedEmail.length !== 0
        ? searchedEmail.map((doc) => (
            <SearchEmailResult key={doc.id} result={doc.newDoc} />
          ))
        : ""}
    </div>
  );
}

export default SearchByEmail;
