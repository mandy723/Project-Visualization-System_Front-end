import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

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
    const color = window.getColorByName(chart.label);
    data.labels.push(chart.label);
    data.datasets[0].data.push(chart.data);
    data.datasets[0].backgroundColor.push(color);
    data.datasets[0].borderColor.push(color);
  });

  if (data.labels.length == 0) {
    data.datasets[0].data.push(1);
    data.datasets[0].backgroundColor.push("rgba(200, 200, 200, 0.2)");
    data.datasets[0].borderColor.push("rgba(255, 255, 255, 0)");
  }

  const options = {
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.labels[tooltipItem.datasetIndex] || null;
          if (label) {
            label += ": ";
            label += data.datasets[0].data[tooltipItem.datasetIndex];
          }
          return label || "無資料";
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
}
