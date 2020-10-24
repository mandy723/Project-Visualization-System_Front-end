import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import { CardActionArea } from '@material-ui/core';

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
    },
    avatar: {
      width: "100%",
      height: "100%"
    }
  }));

export default function RepositoryAvatar(props) {
	const classes = useStyles();
  const history = useHistory();
  
  const goToShow = () => {
    history.push("/show")
  };
  
  return (
    <Card className={classes.large}>
      <CardActionArea onClick={goToShow}>
        <Avatar alt="first repository" src={props.avatarUrl} className={classes.avatar}/>
        <p style={{"text-align":"center"}}>{props.repositoryName}</p>
      </CardActionArea>
    </Card>
  )
}
