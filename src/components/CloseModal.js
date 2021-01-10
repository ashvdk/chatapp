import React from "react";
import CloseIcon from "@material-ui/icons/Close";

function CloseModal({ openorclosemodal }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "5px",
        right: "5px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={openorclosemodal}
    >
      <CloseIcon />
    </div>
  );
}

export default CloseModal;
