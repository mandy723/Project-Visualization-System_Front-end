import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Add, Menu, ExitToApp } from '@material-ui/icons';
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
    height: theme.spacing(20),
  },
}));


export default function Main() {
    const classes = useStyles();
    const [drawerState, setDrawerState] = useState(false);

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
            <IconButton onClick={() => {setDrawerState(true)}}>
                <Menu/>
            </IconButton>
            <Drawer anchor="left" open={drawerState} onClose={() => setDrawerState(false)}>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <ExitToApp/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItem>
                </List>
            </Drawer>
            <div className={classes.root}>
                {repositories.map( repository => {
                    return <RepositoryAvatar avatarUrl={repository.avatarUrl} repositoryName={repository.name}/>
                })}
                <IconButton color="primary" className={classes.large}>
                    <Add className={classes.small}/>
                </IconButton>
            </div>
        </div>
    )
}