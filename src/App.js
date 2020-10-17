import React from 'react';
import logo from './welcome.gif';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label>Username</label>
        <input type="text" id="user_name" name="uname"/>
        
        <label>Password</label>
        <input type="text" id="password" name="password"/>
        <br/>
        <button>Login</button>
      </header>
    </div>
  );
}

export default App;
