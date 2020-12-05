import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { 
  Card, 
  CardActionArea, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import RepositoryAvatar from './RepositoryAvatar';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(25),
  }
}));

function AddProjectDialog({ open, reloadProjects, handleClose }) {
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
           reloadProjects();
           handleClose()
         })
         .catch((e) => {
           console.error(e)
         }) 
    }
  }
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createProject} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default function SelectProject() {
  const classes = useStyles();
  const [addRepoDialogOpen, setAddRepoDialogOpen] = useState(false)
  const [projects, setProjects] = useState([]);

  const loadProjects = () => {
    Axios.get("http://localhost:9100/pvs-api/project/1")
    .then((response) => {
      setProjects(response.data)
    })
    .catch((e) => {
      console.error(e)
    }) 
  }

  useEffect(() => {
    loadProjects();
  }, [])

  return (
    <div className={classes.root}>
      {projects.map( repository =>
        <RepositoryAvatar size="large" avatarUrl={repository.avatarUrl} repositoryName={repository.projectName} />
      )}
      <Card>
        <CardActionArea onClick={() => setAddRepoDialogOpen(true)}>
          <IconButton color="primary" className={classes.large}  disabled>
            <Add className={classes.small}/>
          </IconButton>
        </CardActionArea>
      </Card>
      <AddProjectDialog 
        open={addRepoDialogOpen} 
        reloadProjects={loadProjects}
        handleClose={() => setAddRepoDialogOpen(false)}
      />
    </div>
  )
}
