import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import RepositoryAvatar from './RepositoryAvatar';
import ReactCommits from '../../react_commits_large.png';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),

      },
      minWidth: '30px',
    },
    list: {
      width: 200,
    },
}));

export default function ShowChart() {
	const classes = useStyles();

  const history = useHistory();

  const goToSelect = () => {
    history.push("/select")
  };

  return(
    <div>
      <IconButton onClick={goToSelect}>
        <ArrowBack/>
      </IconButton>
      <div className={classes.root}>
        <RepositoryAvatar 
          size = "small" 
          avatarUrl= "https://avatars3.githubusercontent.com/u/69631?v=4"
        />
        <p>
          <h2>Facebook/React</h2>
          <h4 >A declarative, efficient, and flexible JavaScript library for building user interfaces.</h4>
        </p>
      </div>
      <img src={ReactCommits} alt="ReactCommits" style={{width: "70%"}}/>
    </div>
  );
}
