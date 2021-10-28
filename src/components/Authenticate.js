import React, {useState} from 'react';
import DATA from '../data';
import { Dashboard } from './Dashboard';
import { LoginPage } from './LoginPage';

export const Authenticate = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notif, setNotif] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
  
    const isAdminLoginSuccess = (email, password) => {
      let isFound = false;

      DATA.forEach(user => {
        if(user.email === email && user.password === password) {
          if(user.isAdmin) {
            setIsAdmin(true);
          }
          setNotif('');
          isFound = true;
        }
      });
  
      if(!isFound) setNotif('Wrong username or password.');
      return isFound;
    }
  
    const login = (username, password) => {
        if(isAdminLoginSuccess(username, password)) {
            setIsLoggedIn(true);
        }
    }
  
    const logout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setNotif('You have logged out.');
    }
  
    if(isLoggedIn) {
      if(isAdmin) {
        return <Dashboard logoutHandler={logout} />
      } else {
        // Todo: ClientDashboard
        return "You are a client.";
      }
    } else {
      return <LoginPage loginHandler={login} notif={notif} isLoggedIn={isLoggedIn} />
    }
}
