import React, { useState } from 'react'
import Axios from 'axios'
import logo from './../../welcome.png'
import { useHistory } from 'react-router-dom'
import './Login.css'
import {
  TextField
} from '@material-ui/core'

export default function Login() {
  const styles = theme => ({
    input: {
        color: 'white'
    }
});

  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const login = () => {
    if(username === "" || password === "") {
      alert("不準啦馬的>///<")
    } else {
      let payload = {
        username: username,
        password : password
      }
      Axios.post(`http://localhost:9100/pvs-api/auth/login`, payload)
         .then((response) => {
            localStorage.setItem("jwtToken", response.data)
            goToSelect()
         })
         .catch((e) => {
           alert(e.response.status)
           console.error(e)
         }) 
    }
  }

  const goToSelect = () => {
    history.push("/select")
  }

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TextField
              id="username"
              label="Username"
              type="text"
              variant="outlined"
              background
              onChange = {(e) => {setUsername(e.target.value)}}
            />

          <TextField
              id="password"
              label="Password"
              type="text"
              variant="outlined"
              background
              onChange = {(e) => {setPassword(e.target.value)}}
            />
        <br/>
        <button onClick={login} >Login</button>
      </header>
    </div>
  )
}
