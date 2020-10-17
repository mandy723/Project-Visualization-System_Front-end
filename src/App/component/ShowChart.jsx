import React from 'react';
import RepositoryAvatar from './RepositoryAvatar';
import { makeStyles } from '@material-ui/core/styles';
import ReactCommits from '../../react_commits_large.png';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function ShowChart() {
    const classes = useStyles();
    return(
        <div>
            <div className={classes.root}>
                <RepositoryAvatar size = "small" 
                avatarUrl= "https://avatars3.githubusercontent.com/u/69631?v=4"></RepositoryAvatar>
                <p>
                    <h2>Facebook/React</h2>
                    <h4 >A declarative, efficient, and flexible JavaScript library for building user interfaces.</h4>
                </p>
            </div>
            <img src={ReactCommits} style={{width: "70%"}}/>
        </div>
    );

}
