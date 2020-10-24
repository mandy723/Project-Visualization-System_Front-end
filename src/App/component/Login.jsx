import React from 'react';
import logo from './../../welcome.png';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const history = useHistory();

  const goToSelect =() => {
    history.push("/select")
  };

  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>Username</label>
        <input type="text" id="user_name" name="uname"/>

        <label>Password</label>
        <input type="text" id="password" name="password"/>
        <br/>
        <button onClick={goToSelect} >Login</button>
      </header>
    </div>
  );
}
