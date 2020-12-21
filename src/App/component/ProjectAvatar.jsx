import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Box, CardActionArea, Avatar, CardActions, IconButton } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';

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
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
    icon: {},
    avatar: {
      width: "100%",
      height: "100%"
    }
  }))

function ProjectAvatar(props) {
	const classes = useStyles()
  const history = useHistory()


  
  const goToCommit = () => {
    localStorage.setItem("projectId", props.project.projectId)

    history.push("/commit")
  }
  
  return (
    <Box className={props.size==='large' ? classes.large : classes.small}>
      <CardActionArea onClick={goToCommit}>
        <Avatar alt="first repository" src={props.project.avatarURL} className={classes.avatar}/>
        {props.size === 'large' &&
          <p style={{"text-align":"center"}}>{props.project.projectName}</p>
        }
        {props.size === 'large' && 
          <CardActions disableSpacing>
            {props.project.repositoryDTOList.find(x=> x.type == "github") &&
              <IconButton aria-label="GitHub">
                <GitHubIcon />
              </IconButton>
            }
            {props.project.repositoryDTOList.find(x=> x.type == "sonar") &&
              <IconButton aria-label="SonarQube">
                <GpsFixedIcon />
              </IconButton>
            }
          </CardActions>
        }
      </CardActionArea>
    </Box>
  )
}

export default ProjectAvatar;
