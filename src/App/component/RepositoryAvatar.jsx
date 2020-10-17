import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

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

export default function RepositoryAvatar(props) {
    const classes = useStyles();
    return (
        <Box>
            <IconButton>
                <Avatar alt="first repository" src={props.avatarUrl} className={props.size == "large" ? classes.large : classes.small}/>
            </IconButton>
            <p style={{"text-align":"center"}}>{props.repositoryName}</p>
        </Box>
    )
}