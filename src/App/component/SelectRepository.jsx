import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemText, ListItemIcon, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

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

function RepositoryAvatar(props) {
    const classes = useStyles();
    return (
        <Box>
            <IconButton>
                <Avatar alt="first repository" src={props.avatarUrl} className={classes.large}/>
            </IconButton>
            <p style={{"text-align":"center"}}>{props.repositoryName}</p>
        </Box>
    )
}

export default function Main() {
    const classes = useStyles();
    const [drawerState, setDrawerState] = useState(false);

    // const [ repositories, setRepositories ] = useState([]);

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
                <MenuIcon/>
            </IconButton>
            <Drawer anchor="left" open={drawerState} onClose={() => setDrawerState(false)}>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <MailIcon/>
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
                    <AddIcon className={classes.small}/>
                </IconButton>
            </div>
        </div>
    )
}