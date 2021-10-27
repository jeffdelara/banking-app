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
          <SideLink icon="bx bx-transfer" text="Transfer Funds" />
          <SideLink icon="bx bx-user-pin" text="Profile" />
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
    return (
      <section id="main-content">
        <Account type="Savings Peso" accountNumber="4327059388" balance="1,002,000" />
        <ActionButtons />
        <Transactions />
      </section>
    )
  }
}
class Account extends React.Component {
  render() {
    const {type, accountNumber, balance} = this.props;
    return (
      <div className="account">
          <div className="details">
              <AccountType type={type} />
              <AccountNumber accountNumber={accountNumber} />
          </div>
          <AccountBalance balance={balance} />
      </div>
    )
  }
}
class AccountType extends React.Component {
  render() {
    return (
      <h2>{this.props.type}</h2>
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
        <ActionButton icon="bx bx-copy-alt" text="Pay bills" />
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

class Transactions extends React.Component {
  render() {
    return (
      <div id="transactions">
        <table>
            <TransactionHeader />
            <tbody>
              <TransactionRow 
                  date="Oct 31" 
                  transaction="Credit card payment"
                  amount="2,500"
                  balance="1,000,000" />
              <TransactionRow 
                  date="Oct 31" 
                  transaction="Credit card payment"
                  amount="2,500"
                  balance="1,000,000" />
            </tbody>
          </table>
      </div>
    )
  }
}
class TransactionHeader extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Debit/Credit</th>
          <th>Running Balance</th>
        </tr>
      </thead>
    )
  }
}

class TransactionRow extends React.Component {
  render () {
    const {date, transaction, amount, balance} = this.props;
    return (
      <tr>
        <td>{date}</td>
        <td>{transaction}</td>
        <td>{amount}</td>
        <td>{balance}</td>
      </tr>
    )
  }
}

function App() {
  console.log(DATA);
  return (
    <main>
      <Sidebar />
      <MainContent />
    </main>
  );
}

export default App;
