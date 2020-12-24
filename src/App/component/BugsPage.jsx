import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import { CircularProgress, Backdrop } from '@material-ui/core'
import { connect } from 'react-redux'
import DrawingBoard from './DrawingBoard'
import moment from 'moment'

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

function BugsPage(prop) {
  const classes = useStyles()
  const [bugList, setBugList] = useState([])
  const [currentProject, setCurrentProject] = useState({})
  const [dataForBugChart, setDataForBugChart] = useState({ labels:[], data: { bug: []} })
 
  const projectId = localStorage.getItem("projectId")
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!open)
  };

  //TODO 這邊寫死的記得要改唷!!!! >////<
  let bugUrl = "http://140.124.181.143:9000/project/issues?id=pvs-springboot&resolved=false&types=BUG"
  let sonarComponent = "pvs-springboot"

  useEffect(() => {
    Axios.get(`http://localhost:9100/pvs-api/project/1/${projectId}`)
    .then(response => {
      setCurrentProject(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  }, [])
  
  useEffect(() => {
    handleToggle()
    Axios.get(`http://localhost:9100/pvs-api/sonar/${sonarComponent}/bug`)
    .then((response) => {
      console.log(response.data)
      setBugList(response.data)
      handleClose()
    })
    .catch((error) => {
      console.error(error)
    })
  }, [currentProject])

  useEffect(() => {
    let chartDataset = { labels:[], data: { bug: []} }

    bugList.forEach(bug => {
      // chartDataset.labels.push(bug.date)

      chartDataset.labels.push(moment(bug.date).format("YYYY-MM-DD HH:mm:ss"))
      chartDataset.data.bug.push(bug.value)
    })

    setDataForBugChart(chartDataset)
  }, [bugList, prop.startMonth, prop.endMonth])

  return(
    <div style={{marginLeft:"10px"}}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>{currentProject ? currentProject.projectName : ""}</h1>
      <h2><a href={bugUrl} target="blank">Bugs</a></h2>
      <div className={classes.root}>
        <div style={{width: "67%"}}>
          <div>
            <h1>Bugs</h1>
            <div>
              <DrawingBoard data={dataForBugChart} maxBoardY={Math.max(...dataForBugChart.data.bug)+5}/>
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

export default connect(mapStateToProps)(BugsPage)
