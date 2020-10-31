import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

function AddRepoDialog({ open, handleClose }) {

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to the repository, please enter the repository you want to subscribe here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Repository URL"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default function SelectorRepository() {
  const classes = useStyles();
  const [addRepoDialogOpen, setAddRepoDialogOpen] = useState(false)

  const repositories = [
    {
      name: "facebook/react",
      avatarUrl: "https://avatars3.githubusercontent.com/u/69631?v=4"
    },
    {
      name: "angular/angular",
      avatarUrl: "https://avatars3.githubusercontent.com/u/139426?v=4"
    },
    {
      name: "vuejs/vue",
      avatarUrl: "https://avatars1.githubusercontent.com/u/6128107?v=4"
    }
  ]

  return (
    <div className={classes.root}>
      {repositories.map( repository =>
        <RepositoryAvatar size="large" avatarUrl={repository.avatarUrl} repositoryName={repository.name} />
      )}
      <Card>
        <CardActionArea onClick={() => setAddRepoDialogOpen(true)}>
          <IconButton color="primary" className={classes.large}  disabled>
            <Add className={classes.small}/>
          </IconButton>
        </CardActionArea>
      </Card>
      <AddRepoDialog 
        open={addRepoDialogOpen} 
        handleClose={() => setAddRepoDialogOpen(false)}
      />
    </div>
  )
}
