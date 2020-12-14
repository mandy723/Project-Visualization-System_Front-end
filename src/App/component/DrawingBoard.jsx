import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"

export default function DrawingBoard(props) {
  
    const [data, setData] = useState({})

    const getRandomColor = () => {
      // var letters = "0123456789ABCDEF"
      // var color = "#"
      // for (var i=0 i<6 i++) {
      //   color += letters[Math.floor(Math.random()*16)]
      // }
      // return color
      return `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
    }

    useEffect(() => {
      if (props.data) {
        let datasets = Object.keys(props.data.data).map(key => {
          return {
            label: key,
            fill: false,
            borderColor: getRandomColor(),
            borderWidth: 1,
            pointRadius: 2,
            data: props.data.data[key]
          }
        })

        setData({
          labels: props.data.labels,
          datasets: datasets
        })
      }
    }, [props.data])
  
    var options = {
      legend: {
        position: "right",
        display: true,
        labels: {
          boxWidth: 10
        },
        // onClick: 
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
    }
  
    return (
      <div className="App main">
        <Line data={data} options={options} />
      </div>
    )
  }
  