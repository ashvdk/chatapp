import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchIcon from "@material-ui/icons/Search";
import db from "../firebase";
import "./CreateChat.css";
import CloseModal from "./CloseModal";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const CreateChat = ({ openorclosemodal }) => {
  const [searchEmail, setsearchEmail] = useState("");
  const [searchedEmail, setsearchedEmail] = useState([]);
  const [transition, settransition] = useState(true);
  const [groupDetails, setgroupDetails] = useState({
    groupName: "",
    groupMembers: [],
  });
  const onSearch = (e) => {
    e.preventDefault();
    console.log(searchEmail);
    db.collection("users")
      .where("email", "==", searchEmail)
      .get()
      .then(function (querySnapshot) {
        let searchedPeople = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          searchedPeople.push(doc.data());
        });
        setsearchedEmail(searchedPeople);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };
  const continueToAddMembers = (e) => {
    e.preventDefault();
    if (groupDetails.groupName) {
      settransition(!transition);
    }
  };
  return ReactDOM.createPortal(
    <div style={modalDesign}>
      <div
        style={{
          position: "relative",
          background: "white none repeat scroll 0% 0%",
          borderRadius: "5px",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center", fontSize: "20px", height: "100%" }}>
          <CloseModal openorclosemodal={openorclosemodal} />
          <div
            className="createchat__creategroup"
            style={{ display: transition ? "flex" : "none" }}
          >
            <div style={{ textAlign: "left", padding: "10%" }}>
              <div
                style={{
                  fontSize: "35px",
                  fontWeight: "bold",
                }}
              >
                Let's start with a name for your group
              </div>
              <form>
                <input
                  style={{
                    height: "35px",
                    margin: "7% 0%",
                    border: "none",
                    borderBottom: "2px solid",
                    width: "60%",
                    fontSize: "34px",
                    color: "black",
                    padding: "5px",
                  }}
                  placeholder="Group Name"
                  value={groupDetails.groupName}
                  onChange={(e) => {
                    setgroupDetails({
                      ...groupDetails,
                      groupName: e.target.value,
                    });
                  }}
                />
                <button
                  className="creategroup__button"
                  type="submit"
                  onClick={continueToAddMembers}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
          <div
            className="creategroup__addmembers"
            style={{ display: !transition ? "block" : "none" }}
          >
            <div className="sidebar__search">
              <div className="sidebar__searchContainer">
                <SearchIcon />
                <form>
                  <input
                    placeholder="Enter email to search"
                    value={searchEmail}
                    onChange={(e) => setsearchEmail(e.target.value)}
                  />
                  <button onClick={onSearch}>search</button>
                </form>
              </div>
            </div>
            <div
              className="createchat__itemTabs"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "77%",
                  display: "flex",
                  borderBottom: "1px solid gainsboro",
                }}
              >
                <div
                  style={{
                    color: "#1a73e8",
                    borderBottom: "2px solid #1a73e8",
                    cursor: "pointer",
                  }}
                >
                  People
                </div>
                <div
                  style={{
                    margin: "0px 10px",
                    color: "grey",
                    cursor: "pointer",
                  }}
                >
                  Friends
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1%",
              }}
            >
              {searchedEmail.length != 0
                ? searchedEmail.map((doc) => (
                    <div className="createchat__searchedEmail">
                      <div
                        style={{
                          flex: 1,
                        }}
                      >
                        {doc.name}
                      </div>
                      <PersonAddIcon />
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal-root")
  );
};

const modalDesign = {
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "fixed",
  height: "100%",
  width: "100%",
  top: "0",
  left: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default CreateChat;
