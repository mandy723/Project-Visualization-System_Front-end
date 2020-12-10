import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core'

export default function AddProjectDialog({ open, reloadProjects, handleClose }) {
    const [projectName, setProjectName] = useState("")
    const [repositoryURL, setRepositoryURL] = useState("")
    const createProject = () => {
      if(projectName === "" || repositoryURL === "") {
        alert("不準啦馬的>///<")
      } else {
        let payload = {
          projectName : projectName,
          repositoryURL : repositoryURL
        }
        Axios.post("http://localhost:9100/pvs-api/project", payload)
           .then((response) => {
             reloadProjects()
             handleClose()
           })
           .catch((e) => {
             console.error(e)
           }) 
      }
    }

    useEffect(() => {
      setProjectName("")
      setRepositoryURL("")
    }, [open])
    
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a project, please enter the project name and the repository URL you want to subscribe here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="ProjectName"
              label="Project Name"
              type="text"
              fullWidth
              onChange = {(e) => {setProjectName(e.target.value)}}
            />
            <TextField
              margin="dense"
              id="RepositoryURL"
              label="Repository URL"
              type="text"
              fullWidth
              onChange = {(e) => {setRepositoryURL(e.target.value)}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={createProject} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
  