import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProjectAvatar from './ProjectAvatar'
import DrawingBoard from './DrawingBoard'
import Axios from 'axios'
import moment from 'moment'
import { CircularProgress, Backdrop } from '@material-ui/core'
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      minWidth: '30px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}))

function IssuesPage(prop) {
	const classes = useStyles()
  const [issueListData, setIssueListData] = useState([])
  const [dataForIssueChart, setDataForIssueChart] = useState({ labels:[], data: { created: [], closed: []} })

  const [currentProject, setCurrentProject] = useState({ })

  const projectId = localStorage.getItem("projectId")
  const jwtToken = localStorage.getItem("jwtToken")

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    Axios.get(`http://localhost:9100/pvs-api/project/1/${projectId}`,
    { headers: {"Authorization" : `${jwtToken}`} })
    .then((response) => {
      setCurrentProject(response.data)
    })
    .catch((e) => {
      alert(e.response.status)
      console.error(e)
    })
  }, [])

  useEffect(() => {
    if(Object.keys(currentProject).length != 0) {
      handleToggle()
      const githubRepo = currentProject.repositoryDTOList.find(repo => repo.type == 'github')
      const query = githubRepo.url.split("github.com/")[1]
  
        // todo need reafctor with async
      Axios.get(`http://localhost:9100/pvs-api/github/issues/${query}`,
      { headers: {"Authorization" : `${jwtToken}`} })
        .then((response) => {
          console.log(response.data)
          setIssueListData(response.data)
          handleClose()
        })
        .catch((e) => {
          alert(e.response.status);
          console.error(e)
        })
    }
  }, [currentProject, prop.startDate, prop.endDate])

  useEffect(() => {
    let { startDate, endDate } = prop
	startDate = moment(startDate);
	endDate = moment(endDate);
    let chartDataset = { labels:[], data: { created: [], closed: []} }
    let issueListDataSortedByCreatedAt = issueListData
    let issueListDataSortedByClosedAt = issueListData.filter(v => v.closedAt != null)

    issueListDataSortedByCreatedAt.sort((a, b) => a.createdAt - b.createdAt)
    issueListDataSortedByClosedAt.sort((a, b) => a.closedAt - b.closedAt)
    if (issueListDataSortedByCreatedAt.length > 0) {
		let is_same_month = ( Math. abs(startDate.diff(endDate, 'days')) <= 60);
		let unit = "days";
		let symbol = "YYYY-MM-DD";
		if (!is_same_month) {
			unit = "month";
			symbol = "YYYY-MM";
		}
      for (let date = moment(startDate); date.isSameOrBefore(endDate, unit); date=date.add(1, unit)) {
        let index
		chartDataset.labels.push(date.format(symbol))
        
        index = issueListDataSortedByCreatedAt.findIndex(issue => {
			return date.isBefore(issue.createdAt, unit);
        })
        chartDataset.data.created.push(index == -1 ? issueListDataSortedByCreatedAt.length : index)
        
        index = issueListDataSortedByClosedAt.findIndex(issue => {
			return date.isBefore(issue.closedAt, unit);
        })
        chartDataset.data.closed.push(index == -1 ? issueListDataSortedByClosedAt.length : index)
      }
    }
    setDataForIssueChart(chartDataset)
  }, [issueListData])

  return(
    <div style={{marginLeft:"10px"}}>
       <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.root}>
        <ProjectAvatar 
          size = "small" 
          project={currentProject}
        />
        <p>
          <h2>{currentProject.projectName}</h2>
          
        </p>
      </div>
      <div className={classes.root}>
        <div style={{width: "67%"}}>
          <div>
            <h1>Team</h1>
            <div>
              <DrawingBoard data={dataForIssueChart} color='skyblue' id="team-issue-chart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
	startDate: state.selectedDate.startDate,
    endDate: state.selectedDate.endDate
  }
}

export default connect(mapStateToProps)(IssuesPage);
