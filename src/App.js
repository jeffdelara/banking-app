import React from 'react';
import logo from './logo.svg';
import DATA from './data';
import ADMIN from './admin';
import './App.css';

class Sidebar extends React.Component {
  render() {
    return(
      <section id="side-menu">
          <Logo />
          <SideMenu logoutHandler={this.props.logoutHandler} />          
      </section>
    )
  }
}

class Logo extends React.Component {
  render() {
    return(
      <h1 id="logo"><i className='bx bxs-paper-plane' ></i> Avion Bank</h1>
    )
  }
}
class SideMenu extends React.Component {
  render() {
    return (
      <ul>
          <SideLink icon="bx bx-home" text="Home" />
          <SideLink icon="bx bx-user-pin" text="Create Account" />
          <SideLink icon="bx bx-transfer" text="Transfer/Withdraw" />
          <SideLink logoutHandler={this.props.logoutHandler} icon="bx bx-log-out" text="Logout" />
      </ul>
    )
  }
}

class SideLink extends React.Component {
  render() {
    const {icon, text} = this.props;
    return (
      <li><a onClick={this.props.logoutHandler} href="#"><i className={icon} ></i> {text}</a></li>
    )
  }
}

class MainContent extends React.Component {
  render() {
    const users = this.props.users;
    
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
}
class Account extends React.Component {
  render() {
    const {type, accountNumber, balance, fullname} = this.props;
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
}

class AccountHolder extends React.Component {
  render() {
    return (
      <h1>{this.props.fullname}</h1>
    )
  }
}
class AccountType extends React.Component {
  render() {
    return (
      <h3>{this.props.type}</h3>
    )
  }
}
class AccountNumber extends React.Component {
  render() {
    return (
      <div>{this.props.accountNumber}</div>
    )
  }
}

class AccountBalance extends React.Component {
  render() {
    const balance = this.props.balance;
    return (
      <div className="balance">{balance}</div>
    )
  }
}
class ActionButtons extends React.Component {
  render() {
    return (
      <div id="actions">
        <ActionButton icon="bx bx-transfer" text="Transfer Funds" />
        <ActionButton icon="bx bx-transfer" text="Withdraw Funds" />
      </div>
    )
  }
}

class ActionButton extends React.Component {
  render() {
    const {icon, text} = this.props
    return (
      <button><i className={icon} ></i> {text}</button>
    )
  }
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {username: '', password: ''}
    this.loginHandler = this.loginHandler.bind(this);
    this.passwordHandle = this.passwordHandle.bind(this);
    this.userHandle = this.userHandle.bind(this);
  }

  passwordHandle(event) {
    this.setState({
      password: event.target.value
    });
  }

  userHandle(event) {
    this.setState({
      username: event.target.value
    });
  }

  loginHandler(event) {
    event.preventDefault();
    this.props.loginHandler(this.state);
  }

  render() {
    return (
      <div id="login-page">
        <div id="login">
          <Logo />
          <div className="notif danger">{this.props.notif}</div>
          <label for="username">Username</label>
          <input id="username" autoComplete="off" value={this.state.username} onChange={this.userHandle} type="text" />
          <label for="password">Password</label>
          <input id="password" autoComplete="off" value={this.state.password} onChange={this.passwordHandle} type="password" />
          <button onClick={this.loginHandler} className="btn">Login</button>
        </div>
      </div>
    )
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <main>
        <Sidebar logoutHandler={this.props.logoutHandler} />
        <MainContent users={DATA} />
      </main>
    )
  }
}

function formatNumber(number) 
{
  return number.toLocaleString(undefined, {maximumFractionDigits: 2});
}

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false }
  }

  isAdminLoginSuccess(email, password) {
    let isFound = false;
    ADMIN.forEach(user => {
      if(user.email === email && user.password === password) {
        isFound = true;
      }
    });

    if(!isFound) this.setState({notif: 'Wrong username or password.'});
    return isFound;
  }

  loginHandler({username, password}) {
    if(this.isAdminLoginSuccess(username, password)) {
      this.setState({isLoggedIn: true});
    }
  }

  logoutHandler() {
    this.setState({isLoggedIn: false, notif: ''});
  }

  render() {
    if(this.state.isLoggedIn) {
      return <Dashboard logoutHandler={this.logoutHandler.bind(this)} />
    } else {
      return <LoginPage loginHandler={this.loginHandler.bind(this)} notif={this.state.notif} isLoggedIn={this.state.isLoggedIn} />
    }
  }
}

function App() {
  return (
    <Authenticate />
  );
}

export default App;
