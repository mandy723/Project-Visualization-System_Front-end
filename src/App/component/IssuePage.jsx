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

function IssuePage(prop) {
	const classes = useStyles()
  const [issueListData, setIssueListData] = useState([])
  const [dataForIssueChart, setDataForIssueChart] = useState({ labels:[], data: { created: [], closed: []} })

  const projectId = localStorage.getItem("projectId")
  const projectName = localStorage.getItem("projectName")
  const avatarURL = localStorage.getItem("avatarURL")

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
    const { endMonth } = prop
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
          <div>
            <h1>Team</h1>
            <div>
              <DrawingBoard data={dataForIssueChart}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    endMonth: state.selectedMonth.endMonth
  }
}

export default connect(mapStateToProps)(IssuePage);
