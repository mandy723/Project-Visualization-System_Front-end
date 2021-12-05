import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'	
import { useHistory } from 'react-router-dom'
import './Login.css'
import {
  TextField,
  Button
} from '@material-ui/core'

export default function Login() {
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


	const classes = useStyles()
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const register = () => {
    if(username === "" || password === "") {
      alert("輸入的資料不正確")
    } else {
      let payload = {
        username: username,
        password : password
      }
      Axios.post(`http://localhost:9100/pvs-api/member`, payload)
         .then((response) => {
			alert("註冊成功!")
            goToLogin()
         })
         .catch((e) => {
           alert(e.response.data)
           console.error(e)
		   
         }) 
    }
  }

  const goToLogin = () => {
    history.push("/login")
  }
  return (
	  
    <div class = {classes.root}>
      <header className="App-header">
        <TextField
              id="username"
              label="Username"
              type="text"
              variant="outlined"
			  autocomplete="off"
              background
			  required="true"
              onChange = {(e) => {setUsername(e.target.value)}}
            />

          <TextField
              id="password"
              label="Password"
              type="password"
			  autocomplete="off"
              variant="outlined"
              background
			  required="true"
              onChange = {(e) => {setPassword(e.target.value)}}
            />
        <br/>
        {/* <button onClick={login} >Login</button> */}
		<div>
        <Button variant="contained" onClick={register} color="primary">
            Confirm
        </Button>
		&nbsp;&nbsp;&nbsp;
		<Button variant="contained" onClick={goToLogin} color="secondary">
            Cancel
        </Button>
		</div>
      </header>
    </div>
  )
}
