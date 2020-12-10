import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Box, CardActionArea, Avatar } from '@material-ui/core'

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
    avatar: {
      width: "100%",
      height: "100%"
    }
  }))

export default function RepositoryAvatar(props) {
	const classes = useStyles()
  const history = useHistory()
  
  const goToShow = () => {
    history.push("/show")
  }
  
  return (
    <Box className={props.size==='large' ? classes.large : classes.small}>
      <CardActionArea onClick={goToShow}>
        <Avatar alt="first repository" src="https://www.peppercarrot.com/extras/html/2016_cat-generator/avatar.php?seed=" className={classes.avatar}/>
        <p style={{"text-align":"center"}}>{props.repositoryName}</p>
      </CardActionArea>
    </Box>
  )
}
