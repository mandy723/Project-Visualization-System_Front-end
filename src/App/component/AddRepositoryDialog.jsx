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

export default function AddRepositoryDialog({ open, reloadProjects, handleClose, projectId, repoType}) {
    const [repositoryURL, setRepositoryURL] = useState("")
    const addRepository = () => {
      if(repositoryURL === "") {
        alert("不準啦馬的>///<")
      } else {
        let payload = {
          projectId: projectId,
          repositoryURL : repositoryURL
        }
        Axios.post(`http://localhost:9100/pvs-api/project/${projectId}/repository`, payload)
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
      setRepositoryURL("")
    }, [open])
    
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Repository</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {repoType == "github" ? 
                "To add a GitHub repository, please enter the repository URL here.":
                "To add a SonarQube repository, please enter the repository URL here."}
            </DialogContentText>
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
            <Button onClick={addRepository} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
  