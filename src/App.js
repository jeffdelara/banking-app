import React from 'react';
import logo from './logo.svg';
import DATA from './data';
import './App.css';

class Sidebar extends React.Component {
  render() {
    return(
      <section id="side-menu">
          <Logo />
          <SideMenu />          
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
          <SideLink icon="bx bx-log-out" text="Logout" />
      </ul>
    )
  }
}

class SideLink extends React.Component {
  render() {
    const {icon, text} = this.props;
    return (
      <li><a href="#"><i className={icon} ></i> {text}</a></li>
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
    
    // console.log(bankAccounts);
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

function formatNumber(number) 
{
  return number.toLocaleString(undefined, {maximumFractionDigits: 2});
}


function App() {  
  return (
    <main>
      <Sidebar />
      <MainContent users={DATA} />
    </main>
  );
}

export default App;
