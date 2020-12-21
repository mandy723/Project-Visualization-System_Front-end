import React, { useState, useEffect, Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import { CircularProgress, Backdrop } from '@material-ui/core'

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

function SonarQubePage(prop) {
	const classes = useStyles()
  const [coverage, setCoverage] = useState(0.0)
 
  const projectId = localStorage.getItem("projectId")
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  };
  const handleToggle = () => {
    setOpen(!open)
  };

  //TODO 這邊寫死的記得要改唷!!!! >////<
  let coverageUrl = "http://140.124.181.143:9000/component_measures?id=ssl.ois%3Atimelog_api&metric=coverage&view=list"
  let sonarComponent = "ssl.ois:timelog_api"
  
  useEffect(() => {
    handleToggle()
    Axios.get(`http://localhost:9100/pvs-api/sonar/${sonarComponent}/coverage`)
    .then((response) => {
      setCoverage(response.data)
      handleClose()
    })
    .catch((error) => {
      console.error(error)
    })
  }, [])

  return(
    <div style={{marginLeft:"10px"}}>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1> SonarQube </h1>
      <h2><a href={coverageUrl}>{coverage}</a></h2>
    </div>
  )
}

export default SonarQubePage;
