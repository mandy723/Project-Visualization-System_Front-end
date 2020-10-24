import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, IconButton } from '@material-ui/core';
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


export default function SelectorRepository() {
	const classes = useStyles();

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
    <div>
      <div className={classes.root}>
        {repositories.map( repository =>
          <RepositoryAvatar avatarUrl={repository.avatarUrl} repositoryName={repository.name} />
        )}
        <Card>
          <CardActionArea>
            <IconButton color="primary" className={classes.large}  disabled>
              <Add className={classes.small}/>
            </IconButton>
          </CardActionArea>
        </Card>
      </div>
    </div>
  )
}
