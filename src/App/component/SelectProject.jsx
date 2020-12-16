import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { 
  Card, 
  CardActionArea, 
  IconButton
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import ProjectAvatar from './ProjectAvatar';
import { useEffect } from 'react';
import AddProjectDialog from './AddProjectDialog';


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

export default function SelectProject() {
  const classes = useStyles()
  const [addRepoDialogOpen, setAddRepoDialogOpen] = useState(false)
  const [projects, setProjects] = useState([])

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
      {projects.map( project =>
        <ProjectAvatar size="large" project={project} />
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
