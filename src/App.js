import React, { useState } from 'react';
import logo from './logo.svg';
import DATA from './data';
import './App.css';

const Sidebar = (props) => {
  return(
    <section id="side-menu">
        <Logo />
        <SideMenu logoutHandler={props.logoutHandler} />          
    </section>
  )
}


const Logo = () => {
  return(
    <h1 id="logo"><i className='bx bxs-paper-plane' ></i> Avion Bank</h1>
  )
}


const SideMenu = (props) => {
  return (
    <ul>
        <SideLink icon="bx bx-home" text="Home" />
        <SideLink icon="bx bx-user-pin" text="Create Account" />
        <SideLink icon="bx bx-transfer" text="Transfer/Withdraw" />
        <SideLink logoutHandler={props.logoutHandler} icon="bx bx-log-out" text="Logout" />
    </ul>
  )
}


const SideLink = (props) => {
  const {icon, text} = props;
  return (
    <li><a onClick={props.logoutHandler} href="#"><i className={icon} ></i> {text}</a></li>
  )
}

const MainContent = (props) => {
  const users = props.users;
    
  const bankAccounts = users.map(user => {
    return <Account fullname={user.fullname} 
      type={user.type} 
      accountNumber={user.number} 
      balance={user.balance} />
  });
    
  return (
    <section id="main-content">
      {bankAccounts}
    </section>
  )
}


const Account = (props) => {
  const {type, accountNumber, balance, fullname} = props;
  return (
    <div className="account">
        <div className="details">
            <AccountHolder fullname={fullname} />
            <AccountType type={type} />
            <AccountNumber accountNumber={accountNumber} />
            <ActionButtons />
        </div>
        <AccountBalance balance={formatNumber(balance)} />
    </div>
  )
}

const AccountHolder = (props) => {
  return (
    <h1>{props.fullname}</h1>
  )
}


const AccountType = (props) => {
  return (
    <h3>{props.type}</h3>
  )
}


const AccountNumber = (props) => {
  return (
    <div>{props.accountNumber}</div>
  )
}


const AccountBalance = (props) => {
  const balance = props.balance;
  return (
    <div className="balance">{balance}</div>
  )
}

const ActionButtons = () => {
  return (
    <div id="actions">
      <ActionButton icon="bx bx-transfer" text="Transfer Funds" />
      <ActionButton icon="bx bx-transfer" text="Withdraw Funds" />
    </div>
  )
}

const ActionButton = (props) => {
  const {icon, text} = props
  return (
    <button><i className={icon} ></i> {text}</button>
  )
}


const LoginPage = (props) => {
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


const Dashboard = (props) => {
  return (
    <main>
      <Sidebar logoutHandler={props.logoutHandler} />
      <MainContent users={DATA} />
    </main>
  )
}


function formatNumber(number) 
{
  return number.toLocaleString(undefined, {maximumFractionDigits: 2});
}

const Authenticate = () => {
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
  }

  if(isLoggedIn) {
    if(isAdmin) {
      return <Dashboard logoutHandler={logout} />
    } else {
      return "You are a client.";
    }
  } else {
    return <LoginPage loginHandler={login} notif={notif} isLoggedIn={isLoggedIn} />
  }
}

function App() {
  return (
    <Authenticate />
  );
}

export default App;
