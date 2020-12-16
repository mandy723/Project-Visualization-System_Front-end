import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import ProjectAvatar from './ProjectAvatar'
import DrawingBoard from './DrawingBoard'
import Axios from 'axios'
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      minWidth: '30px',
    },
}))

function CodeBasePage(prop) {
	const classes = useStyles()
  const [commitListData, setCommitListData] = useState([])
  const [dataForCodeBaseChart, setDataForCodeBaseChart] = useState({ labels:[], data: {additions: [], deletions: []} })

  const projectId = localStorage.getItem("projectId")
  const projectName = localStorage.getItem("projectName")
  const avatarURL = localStorage.getItem("avatarURL")

  useEffect(() => {
    Axios.get("http://localhost:9100/pvs-api/commits/facebook/react")
         .then((response) => {
           setCommitListData(response.data)
         })
         .catch((e) => {
           console.error(e)
         })
  }, [])
  
  useEffect(() => {
    const { startMonth, endMonth } = prop

    let chartDataset = { labels:[], data: { additions: [], deletions: []} }
    for (let month = moment(startMonth); month <= moment(endMonth); month=month.add(1, 'months')) {
      chartDataset.labels.push(month.format("YYYY-MM"))

      chartDataset.data.additions.push(commitListData.filter(commit=>{
        return moment(commit.committedDate).format("YYYY-MM") == month.format("YYYY-MM")
      })
      .reduce(function(additionSum, currentCommit) {
          return additionSum + currentCommit.additions;
      }, 0))
      chartDataset.data.deletions.push(commitListData.filter(commit=>{
        return moment(commit.committedDate).format("YYYY-MM") == month.format("YYYY-MM")
      })
      .reduce(function(deletionSum, currentCommit) {
        return deletionSum - currentCommit.deletions;
      }, 0))
    }
    setDataForCodeBaseChart(chartDataset)
  }, [commitListData, prop.startMonth, prop.endMonth])

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
          <div>
            <h1>Team</h1>
            <div>
              <DrawingBoard data={dataForCodeBaseChart}/>
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
    endMonth: state.selectedMonth.endMonth
  }
}

export default connect(mapStateToProps)(CodeBasePage);
