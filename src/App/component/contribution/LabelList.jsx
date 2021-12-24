import React from "react";
 
export default function DrawingPieBoard(props) {
 const labels = window.pieLabel.filter(function(item, pos){
 return window.pieLabel.indexOf(item) == pos; 
 });
 let label_text = labels.map(label => {
 const color = window.getColorByName(label);
 const style = {
 display: "INLINE-BLOCK",
 'margin-left': "10px",
 'background-color': color
 };
 return <div style={style}>{label}</div>;
 });
 return <div>{label_text}</div> ;
}