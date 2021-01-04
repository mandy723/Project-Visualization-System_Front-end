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
  const [currentProject, setCurrentProject] = useState(undefined)
  const [bugUrl, setBugUrl] = useState("")
  const [dataForBugChart, setDataForBugChart] = useState({ labels:[], data: { bug: []} })
 
  const projectId = localStorage.getItem("projectId")
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!open)
  };

  const jwtToken = localStorage.getItem("jwtToken")

  //TODO 這邊寫死的記得要改唷!!!! >////<

  useEffect(() => {
    Axios.get(`http://localhost:9100/pvs-api/project/1/${projectId}`,
    { headers: {"Authorization" : `${jwtToken}`} })
    .then(response => {
      setCurrentProject(response.data)
    })
    .catch(e => {
      alert(e.response.status)
      console.error(e)
    })
  }, [])
  
  useEffect(() => {
    handleToggle()
    if(currentProject != undefined){
      let repositoryDTO = currentProject.repositoryDTOList.find(x => x.type == "sonar")
      let sonarComponent = repositoryDTO.url.split("id=")[1]
      setBugUrl(`http://140.124.181.143:9000/project/issues?id=${sonarComponent}&resolved=false&types=BUG`)
      Axios.get(`http://localhost:9100/pvs-api/sonar/${sonarComponent}/bug`,
      { headers: {"Authorization" : `${jwtToken}`} })
      .then((response) => {
        setBugList(response.data)
      })
      .catch((e) => {
        alert(e.response.status)
        console.error(e)
      })
    }
  }, [currentProject])

  
  useEffect(() => {
    let chartDataset = { labels:[], data: { bug: []} }

    bugList.forEach(bug => {
      chartDataset.labels.push(moment(bug.date).format("YYYY-MM-DD HH:mm:ss"))
      chartDataset.data.bug.push(bug.value)
    })

    setDataForBugChart(chartDataset)
    handleClose()

  }, [bugList, prop.startMonth, prop.endMonth])

  return(
    <div style={{marginLeft:"10px"}}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>{currentProject ? currentProject.projectName : ""}</h1>
      <h2><a href={bugUrl} target="blank">{dataForBugChart.data.bug[dataForBugChart.data.bug.length-1]}</a></h2>
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
