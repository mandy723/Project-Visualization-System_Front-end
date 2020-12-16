import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProjectAvatar from './ProjectAvatar'
import DrawingBoard from './DrawingBoard'
import Axios from 'axios'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      minWidth: '30px',
    },
}))

function CommitPage(prop) {
	const classes = useStyles()
  const [commitListData, setCommitListData] = useState([])
  const [dataForTeamCommitChart, setDataForTeamCommitChart] = useState({ labels:[], data: { team: []} })
  const [dataForMemberCommitChart, setDataForMemberCommitChart] = useState({ labels:[], data: {} })

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
    const { startMonth, endMonth } = prop

    let chartDataset = { labels:[], data: { team: []} }
    for (let month = moment(startMonth); month <= moment(endMonth); month=month.add(1, 'months')) {
      chartDataset.labels.push(month.format("YYYY-MM"))
      chartDataset.data.team.push(commitListData.filter(commit=>{
        return moment(commit.committedDate).format("YYYY-MM") == month.format("YYYY-MM")
      }).length)
    }
    setDataForTeamCommitChart(chartDataset)
  }, [commitListData, prop.startMonth, prop.endMonth])

  useEffect(() => {

    const { startMonth, endMonth } = prop

    let chartDataset = {
      labels:[],
      data: {}
    }
    new Set(commitListData.map(commit=>commit.authorName)).forEach(author => {
      chartDataset.data[author] = []
    })
    for (let month = moment(startMonth); month <= moment(endMonth); month=month.add(1, 'months')) {
      chartDataset.labels.push(month.format("YYYY-MM"))
      for (var key in chartDataset.data) {
        chartDataset.data[key].push(0)
      }
      commitListData.forEach(commitData => {
        if (moment(commitData.committedDate).format("YYYY-MM") == month.format("YYYY-MM")) {
          chartDataset.data[commitData.authorName][chartDataset.labels.length-1] += 1
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
    console.log(chartDataset)
    setDataForMemberCommitChart(chartDataset)
  }, [commitListData, prop.startMonth, prop.endMonth])

  if(!prop.currentProject) {
    return (
      <Redirect to="/select"/>
    )
  }

  return(
    <div style={{marginLeft:"10px"}}>
      <div className={classes.root}>
        <ProjectAvatar 
          size = "small" 
          project={prop.currentProject}
        />
        <p>
          <h2>{prop.currentProject ? prop.currentProject.projectName : ""}</h2>
        </p>
      </div>
      <div className={classes.root}>
        <div style={{width: "67%"}}>
          <div>
            <h1>Team</h1>
            <div>
              <DrawingBoard data={dataForTeamCommitChart}/>
            </div>
            <h1>Member</h1>
            <div>
              <DrawingBoard data={dataForMemberCommitChart}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    startMonth: state.selectedMonth.startMonth,
    endMonth: state.selectedMonth.endMonth,
    currentProject: state.currentProject
  }
}

export default connect(mapStateToProps)(CommitPage);