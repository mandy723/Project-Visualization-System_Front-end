import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import ProjectAvatar from './ProjectAvatar'
import DrawingBoard from './DrawingBoard'
import ChartFilter from './ChartFilter'
import Axios from 'axios'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      minWidth: '30px',
    },
}))

export default function ShowChart(prop) {
	const classes = useStyles()
  const [commitChartVisible, setCommitChartVisible] = useState(true)
  const [commitListData, setCommitListData] = useState([])
  const [issueListData, setIssueListData] = useState([])
  const [dataForTeamCommitChart, setDataForTeamCommitChart] = useState({ labels:[], data: { team: []} })
  const [dataForMemberCommitChart, setDataForMemberCommitChart] = useState({ labels:[], data: {} })
  const [dataForIssueChart, setDataForIssueChart] = useState({ labels:[], data: { created: [], closed: []} })
  const [startMonth, setStartMonth] = useState(moment().subtract(1, 'years').format("YYYY-MM"))
  const [endMonth, setEndMonth] = useState(moment().format("YYYY-MM"))

  const projectId = localStorage.getItem("projectId")
  const projectName = localStorage.getItem("projectName")
  const avatarURL = localStorage.getItem("avatarURL")

  useEffect(() => {
    Axios.post("http://localhost:9100/pvs-api/commits/facebook/react")
    .then((response) => {
      //todo need reafctor with async
      Axios.get("http://localhost:9100/pvs-api/commits/facebook/react")
         .then((response) => {
           setCommitListData(response.data)
         })
         .catch((e) => {
           console.error(e)
         })
    })
    .catch((e) => {
      console.error(e)
    })
  }, [])

  useEffect(() => {
    Axios.get("http://localhost:9100/pvs-api/issues/facebook/react")
         .then((response) => {
           setIssueListData(response.data)
         })
         .catch((e) => {
           console.error(e)
         })
  }, [])

  useEffect(() => {
    let chartDataset = { labels:[], data: { team: []} }
    for (let month = moment(startMonth); month <= moment(endMonth); 
    month=month.add(1, 'months')) {
      chartDataset.labels.push(month.format("YYYY-MM"))
      chartDataset.data.team.push(commitListData.filter(commit=>{
        return moment(commit.committedDate).format("YYYY-MM") == month.format("YYYY-MM")
      }).length)
    }
    setDataForTeamCommitChart(chartDataset)
  }, [commitListData])

  useEffect(() => {
    let chartDataset = {
      labels:[],
      data: {}
    }
    new Set(commitListData.map(commit=>commit.authorEmail)).forEach(author => {
      chartDataset.data[author] = []
    })
    for (let month = moment(startMonth); month <= moment(endMonth); month=month.add(1, 'months')) {
      chartDataset.labels.push(month.format("YYYY-MM"))
      for (var key in chartDataset.data) {
        chartDataset.data[key].push(0)
      }
      commitListData.forEach(commitData => {
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
  }, [commitListData])

  useEffect(() => {
    console.log(issueListData)
    let chartDataset = { labels:[], data: { created: [], closed: []} }
    let issueListDataSortedByCreatedAt = issueListData
    let issueListDataSortedByClosedAt = issueListData

    issueListDataSortedByCreatedAt.sort((a, b) => a.createdAt - b.createdAt)
    issueListDataSortedByClosedAt.sort((a, b) => a.closedAt - b.closedAt)

    if (issueListDataSortedByCreatedAt.length > 0) {
      for (let month = moment(issueListDataSortedByCreatedAt[0].createdAt); month <= moment(endMonth).add(1, 'months'); month=month.add(1, 'months')) {
        let index
        chartDataset.labels.push(month.format("YYYY-MM"))
        
        index = issueListDataSortedByCreatedAt.findIndex(issue => {
          return moment(issue.createdAt).year() > month.year() || moment(issue.createdAt).year() == month.year() && moment(issue.createdAt).month() > month.month()
        })
        chartDataset.data.created.push(index == -1 ? issueListData.length : index)
        
        index = issueListDataSortedByClosedAt.findIndex(issue => {
          return moment(issue.closedAt).year() > month.year() || moment(issue.closedAt).year() == month.year() && moment(issue.closedAt).month() > month.month()
        })
        chartDataset.data.closed.push(index == -1 ? issueListData.length : index)
      }
    }
    console.log(chartDataset)
    setDataForIssueChart(chartDataset)
  }, [issueListData])

  return(
    <div style={{marginLeft:"10px"}}>
      <div className={classes.root}>
        <ProjectAvatar 
          size = "small" 
          avatarURL={avatarURL}
          projectId={projectId}
          projectName={projectName}
        />
        <p>
          <h2>{projectName}</h2>
          
        </p>
      </div>
      <div className={classes.root}>
        <div style={{width: "67%"}}>
          <div hidden={!commitChartVisible}>
            <h1>Team</h1>
            <div>
              <DrawingBoard test="group" data={dataForTeamCommitChart}/>
            </div>
            <h1>Member</h1>
            <div>
              <DrawingBoard test="person" data={dataForMemberCommitChart}/>
            </div>
          </div>
          <div hidden={commitChartVisible}>
            <h1>Team</h1>
            <div>
              <DrawingBoard test="issue" data={dataForIssueChart}/>
            </div>
          </div>
        </div>
        <Card style={{height: "fit-content"}}>
          <ChartFilter onTabChanged={(tabIndex) => { setCommitChartVisible(tabIndex===0) }}/>
        </Card>
      </div>
    </div>
  )
}
