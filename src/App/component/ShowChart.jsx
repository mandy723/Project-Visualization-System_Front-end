import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import RepositoryAvatar from './RepositoryAvatar';
import DrawingBoard from './DrawingBoard';
import ChartFilter from './ChartFilter';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      minWidth: '30px',
    },
}));

export default function ShowChart() {
	const classes = useStyles();
  const [commitVisible, setCommitVisible] = useState(true)
  
  return(
    <div style={{marginLeft:"10px"}}>
      <div className={classes.root}>
        <RepositoryAvatar 
          size = "small" 
          avatarUrl= "https://avatars3.githubusercontent.com/u/69631?v=4"
        />
        <p>
          <h2>Facebook/React</h2>
          <h3 >A declarative, efficient, and flexible JavaScript library for building user interfaces.</h3>
        </p>
      </div>
      <div className={classes.root}>
        <div style={{width: "67%"}}>
          <div hidden={!commitVisible}>
            <h1>Team</h1>
            <div>
              <DrawingBoard test="group"/>
            </div>
            <h1>Member</h1>
            <div>
              <DrawingBoard test="person"/>
            </div>
          </div>
          <div hidden={commitVisible}>
            <h1>Team</h1>
            <div>
              <DrawingBoard test="issue"/>
            </div>
          </div>
        </div>
        <Card style={{height: "fit-content"}}>
          <ChartFilter onTabChanged={(tabIndex) => { setCommitVisible(tabIndex===0) }}/>
        </Card>
      </div>
    </div>
  );
}
