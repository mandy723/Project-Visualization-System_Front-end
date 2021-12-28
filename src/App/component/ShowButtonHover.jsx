import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import Axios from "axios";

export default function ShowButtonHover({ closeStyle, projectId }) {
  const removeProject = (e) => {
    e.stopPropagation();
    const jwtToken = localStorage.getItem("jwtToken");
    if (window.confirm("是否刪除此專案?") == true) {
      Axios.delete(`http://localhost:9100/pvs-api/project/${projectId}`, {
        headers: { Authorization: `${jwtToken}` },
      }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div
      style={{
        width: 200,
        height: 48,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          float: "right",
        }}
      >
        <IconButton
          aria-label="Close"
          style={closeStyle}
          onClick={removeProject}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
}
