import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
    IconButton,
  } from "@material-ui/core";

export default function ShowButtonHover() {
  const [style, setStyle] = useState({ display: "none" });

  return (
    <div>
      {/* <h2>Hidden Button in the box. Move mouse in the box</h2> */}
      <div
        style={{
          //   border: "1px solid gray",
          width: 20,
          height: 10,
          padding: 10,
          margin: 10,
          //   float: right,
        }}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        {/* <button >Click</button>   onClick={}*/}
        <IconButton aria-label="GitHub" >
          <CloseIcon style={style} />
        </IconButton>
      </div>
    </div>
  );
}
