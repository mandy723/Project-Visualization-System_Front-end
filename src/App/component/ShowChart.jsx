import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import RepositoryAvatar from './RepositoryAvatar';
import DrawingBoard from './DrawingBoard';
import ChartFilter from './ChartFilter';
import Axios from 'axios';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      minWidth: '30px',
    },
}));

export default function ShowChart() {
	const classes = useStyles();
  const [commitVisible, setCommitVisible] = useState(true)
  const [commitsData, setCommitsData] = useState([])
  const [dataForTeamCommitChart, setDataForTeamCommitChart] = useState({ labels:[], data: { team: []} })
  const [dataForMemberCommitChart, setDataForMemberCommitChart] = useState({ labels:[], data: {} })
  const [startMonth, setStartMonth] = useState(moment().subtract(1, 'years').format("YYYY-MM"))
  const [endMonth, setEndMonth] = useState(moment().format("YYYY-MM"))

  useEffect(() => {
    Axios.get("http://localhost:9100/commits/facebook/react")
         .then((response) => {
           setCommitsData(response.data)
         })
         .catch((e) => {
           console.error(e)
         })
  }, [])

  useEffect(() => {
    let chartDataset = { labels:[], data: { team: []} }
    for (let month = moment(startMonth); month <= moment(endMonth); month=month.add(1, 'months')) {
      chartDataset.labels.push(month.format("YYYY-MM"))
      chartDataset.data.team.push(commitsData.filter(commit=>{
        return moment(commit.committedDate).format("YYYY-MM") == month.format("YYYY-MM")
      }).length)
    }
    setDataForTeamCommitChart(chartDataset)
  }, [commitsData])

  useEffect(() => {
    let chartDataset = {
      labels:[],
      data: {}
    }
    new Set(commitsData.map(commit=>commit.authorEmail)).forEach(author => {
      chartDataset.data[author] = []
    })
    for (let month = moment(startMonth); month <= moment(endMonth); month=month.add(1, 'months')) {
      chartDataset.labels.push(month.format("YYYY-MM"))
      for (var key in chartDataset.data) {
        chartDataset.data[key].push(0)
      }
      commitsData.forEach(commitData => {
        if (moment(commitData.committedDate).format("YYYY-MM") == month.format("YYYY-MM")) {
          chartDataset.data[commitData.authorEmail][chartDataset.labels.length-1] += 1
        }
      })
    }
    let temp = Object.keys(chartDataset.data).map(key => [key, chartDataset.data[key]])
    temp.sort((first, second) => second[1].reduce((a, b)=>a+b)-first[1].reduce((a, b)=>a+b))
    let result = {}
    temp.slice(0, 10).forEach(x=> {
      result[x[0]] = x[1]
    })
    chartDataset.data = result
    setDataForMemberCommitChart(chartDataset)
  }, [commitsData])

  return(
    <div style={{marginLeft:"10px"}}>
      <div className={classes.root}>
        <RepositoryAvatar 
          size = "small" 
          avatarUrl= "https://avatars3.githubusercontent.com/u/69631?v=4"
        />
        <p>
          <h2>Facebook/React</h2>
          <h3 >A declarative, efficient, and flexible JavaScript library for building user interfaces.</h3>
        </p>
      </div>
      <div className={classes.root}>
        <div style={{width: "67%"}}>
          <div hidden={!commitVisible}>
            <h1>Team</h1>
            <div>
              <DrawingBoard test="group" data={dataForTeamCommitChart}/>
            </div>
            <h1>Member</h1>
            <div>
              <DrawingBoard test="person" data={dataForMemberCommitChart}/>
            </div>
          </div>
          <div hidden={commitVisible}>
            <h1>Team</h1>
            <div>
              <DrawingBoard test="issue"/>
            </div>
          </div>
        </div>
        <Card style={{height: "fit-content"}}>
          <ChartFilter onTabChanged={(tabIndex) => { setCommitVisible(tabIndex===0) }}/>
        </Card>
      </div>
    </div>
  );
}
