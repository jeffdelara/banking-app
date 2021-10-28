import React, { useState } from 'react';
import { Logo } from './Logo';

export const LoginPage = (props) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
  
    const onSubmitHandler = (event) => {
      event.preventDefault();
      props.loginHandler(username, password);
    }
  
    const onChangeUsername = (event) => {
      setUsername(event.target.value);
    }
  
    const onChangePassword = (event) => {
      setPassword(event.target.value);
    }
  
    return (
      <div id="login-page">
        <div id="login">
          <Logo />
          <div className="notif danger">{props.notif}</div>
          <form onSubmit={onSubmitHandler}>
            <label for="username">Username</label>
            <input id="username" autoComplete="off" onChange={onChangeUsername}  value={username} type="text" />
            <label for="password">Password</label>
            <input id="password" autoComplete="off" onChange={onChangePassword} value={password} type="password" />
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      </div>
    )
}
