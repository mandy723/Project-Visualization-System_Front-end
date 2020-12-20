import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2"

export default function DrawingBoard(props) {
  
    const [data, setData] = useState({})

    const getRandomColor = () => {
      return `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
    }

    useEffect(() => {
      if (props.data) {
        let _backgroundColor = getRandomColor()
        if (props.color) {
          _backgroundColor = `${props.color}`
        }
        let datasets = Object.keys(props.data.data).map(key => {
          return {
            label: key,
            fill: "origin",
            borderColor: getRandomColor(),
            backgroundColor: _backgroundColor,
            borderWidth: 1,
            pointRadius: 2,
            data: props.data.data[key],
            tension: 0
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
  