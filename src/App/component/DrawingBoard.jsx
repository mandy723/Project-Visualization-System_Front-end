import { queryHelpers } from '@testing-library/react';
import React from 'react';
import { Line } from "react-chartjs-2";

export default function DrawingBoard() {
  
    const data = {
      labels: [
        "2020-01",
        "2020-02",
        "2020-03",
        "2020-04",
        "2020-05",
        "2020-06",
        "2020-07",
      ],
      //backgroundColor: ['rgba(255,0,0,1)'],
      //lineTension: 1,
      datasets: [
        {
          label: "HSN",
          fill: false,
          borderColor: "rgba(255, 0, 0, 0.3)",
          borderWidth: 1,
          pointRadius: 2,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "CPX",
          fill: false,
          borderColor: "rgba(0, 255, 0, 0.3)",
          borderWidth: 1,
          pointRadius: 2,
          data: [70, 32, 45, 65, 87, 92, 99]
        },
        {
          label: "Total",
          fill: false,
          borderColor: "blue",
          borderWidth: 2,
          pointRadius: 2,
          data: [135, 91, 125, 144, 143, 143, 139]
        }
      ]
    };
  
    var options = {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10
        }
      },
      scales: {
        xAxes: [
          {
            ticks: { display: true }
          }
        ]
      }
    };
  
    return (
      <div className="App main">
        <Line data={data} options={options} />
      </div>
    );
  }
  