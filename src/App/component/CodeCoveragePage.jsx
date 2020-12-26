import React, { useState, useEffect, Component } from 'react'
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

function CodeCoveragePage(prop) {
  const classes = useStyles()
  const [coverageList, setCoverageList] = useState([])
  const [currentProject, setCurrentProject] = useState(undefined)
  const [dataForCoverageChart, setDataForCoverageChart] = useState({ labels:[], data: { coverage: []} })
  const [coverageUrl, setCoverageUrl] = useState("")
  const projectId = localStorage.getItem("projectId")
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!open)
  };

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
    if(currentProject != undefined){
      let repositoryDTO = currentProject.repositoryDTOList.find(x => x.type == "sonar")
      let sonarComponent = repositoryDTO.url.split("id=")[1]    
      setCoverageUrl(`http://140.124.181.143:9000/component_measures?id=${sonarComponent}&metric=Coverage&view=list`)
      Axios.get(`http://localhost:9100/pvs-api/sonar/${sonarComponent}/coverage`)
      .then((response) => {
        setCoverageList(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    }
  }, [currentProject])

  useEffect(() => {
    let chartDataset = { labels:[], data: { coverage: []} }

    coverageList.forEach(coverage => {
      chartDataset.labels.push(moment(coverage.date).format("YYYY-MM-DD HH:mm:ss"))
      chartDataset.data.coverage.push(coverage.value)
    })
    setDataForCoverageChart(chartDataset)
    handleClose()
  }, [coverageList, prop.startMonth, prop.endMonth])

  return(
    <div style={{marginLeft:"10px"}}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>{currentProject ? currentProject.projectName : ""}</h1>
      <h2><a href={coverageUrl} target="blank">Coverage</a></h2>
      <div className={classes.root}>
        <div style={{width: "67%"}}>
          <div>
            <h1>Coverage</h1>
            <div>
              <DrawingBoard data={dataForCoverageChart} maxBoardY={100}/>
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

export default connect(mapStateToProps)(CodeCoveragePage)
