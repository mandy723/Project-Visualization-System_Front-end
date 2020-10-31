import React from 'react';
import { Line } from "react-chartjs-2";

export default function DrawingBoard({test}) {
  
    const personData = {
      labels: [
        "2020-01",
        "2020-02",
        "2020-03",
        "2020-04",
        "2020-05",
        "2020-06",
        "2020-07",
      ],
      datasets: [
        {
          label: "Tim",
          fill: false,
          borderColor: "rgb(255, 0, 0)",
          borderWidth: 2,
          pointRadius: 2,
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "Mike",
          fill: false,
          borderColor: "rgb(0, 255, 0)",
          borderWidth: 2,
          pointRadius: 2,
          data: [70, 32, 45, 65, 87, 92, 99]
        },
        {
          label: "Jay",
          fill: false,
          borderColor: "blue",
          borderWidth: 2,
          pointRadius: 2,
          data: [135, 91, 125, 144, 143, 143, 139]
        }
      ]
    };

    const groupData = {
      labels: [
        "2020-01",
        "2020-02",
        "2020-03",
        "2020-04",
        "2020-05",
        "2020-06",
        "2020-07",
      ],
      datasets: [
        {
          label: "Team",
          fill: false,
          borderColor: "rgb(255, 0, 0)",
          borderWidth: 1,
          pointRadius: 2,
          data: [270, 182, 250, 290, 286, 290, 278]
        }
      ]
    };

    const issueData = {
      labels: [
        "2020-01",
        "2020-02",
        "2020-03",
        "2020-04",
        "2020-05",
        "2020-06",
        "2020-07",
      ],
      datasets: [
        {
          label: "Reported",
          fill: true,
          backgroundColor: "rgba(255, 0, 0, 0.3)",
          borderColor: "rgb(255, 0, 0)",
          borderWidth: 2,
          pointRadius: 2,
          data: [0, 17, 28, 56, 79, 103, 114]
        },
        {
          label: "Solved",
          fill: true,
          backgroundColor: "rgba(0, 0, 255, 0.7)",
          borderColor: "rgb(0, 0, 255)",
          borderWidth: 2,
          pointRadius: 2,
          data: [0, 12, 24, 40, 76, 89, 100]
        }
      ]
    };
  
    var options = {
      legend: {
        position: "right",
        display: true,
        labels: {
          boxWidth: 10
        },
        onClick: null
      },
      scales: {
        xAxes: [
          {
            ticks: { display: true }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ]
      }
    };
  
    return (
      <div className="App main">
        <Line data={test==="group" ? groupData : test==="person" ? personData : issueData} options={options} />
      </div>
    );
  }
  