import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

export default function ShowButtonHover({ closeStyle }) {
  const [style, setStyle] = useState({ display: "none" });

  const goToCloseProject = (e) => {
    // localStorage.setItem("projectId", props.project.projectId);
    // props.setCurrentProjectId(props.project.projectId);
    // history.push("/dashboard");
    e.stopPropagation();
    alert("刪除專案");
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
          onClick={goToCloseProject}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
}
