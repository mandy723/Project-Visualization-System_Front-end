import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
let i = 0;
const getColor = () => {
  let colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(186, 217, 141, 0.8)",
    "rgba(0, 19, 141, 0.8)",
    "rgba(171, 0, 0, 0.29)",
    "rgba(30, 154, 66, 0.99)",
    "rgba(240, 154, 255, 1)",
    "rgba(215, 249, 99, 1)",
    "rgba(241, 156, 51, 1)",
    "rgba(92, 120, 114, 1)",
    "rgba(187, 170, 119, 1)",
  ];

  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(186, 217, 141, 0.8)",
    "rgba(0, 19, 141, 0.8)",
    "rgba(171, 0, 0, 0.29)",
    "rgba(30, 154, 66, 0.99)",
    "rgba(240, 154, 255, 1)",
    "rgba(215, 249, 99, 1)",
    "rgba(241, 156, 51, 1)",
    "rgba(92, 120, 114, 1)",
    "rgba(187, 170, 119, 1)",
  ];
  i++;

  const color = colors[i % 14];
  const borderColor = borderColors[i % 14];

  return [color, borderColor];
};

export default function DrawingPieBoard(props) {
  let data = {
    labels: [],
    datasets: [
      {
        label: "none",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };
  props.data.forEach((chart) => {
    const [color, borderColor] = getColor();
    data.labels.push(chart.label);
    data.datasets[0].data.push(chart.data);
    data.datasets[0].backgroundColor.push(color);
    data.datasets[0].borderColor.push(borderColor);
  });

  if (data.labels.length == 0) {
    data.labels.push("無資料");
    data.datasets[0].data.push(1);
    data.datasets[0].backgroundColor.push("rgba(200, 200, 200, 0.2)");
    data.datasets[0].borderColor.push("rgba(200, 200, 200, 0.2)");
  }
  return <Pie data={data} />;
}
