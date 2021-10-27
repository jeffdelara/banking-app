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

// class Transactions extends React.Component {
//   render() {
//     const transactions = this.props.transactions;

//     const transactionItems = transactions.map(transaction => {
//       return <TransactionRow date={transaction.date} 
//             transaction={transaction.description} 
//             amount={transaction.amount} 
//             type={transaction.type} />
//     })

//     return (
//       <div id="transactions">
//         <table>
//             <TransactionHeader />
//             <tbody>
//               {transactionItems}
//             </tbody>
//           </table>
//       </div>
//     )
//   }
// }
// class TransactionHeader extends React.Component {
//   render() {
//     return (
//       <thead>
//         <tr>
//           <th></th>
//           <th></th>
//           <th>Debit/Credit</th>
//         </tr>
//       </thead>
//     )
//   }
// }

function formatNumber(number) 
{
  return number.toLocaleString(undefined, {maximumFractionDigits: 2});
}

// class TransactionRow extends React.Component {
//   render () {
//     const {date, transaction, amount, type} = this.props;
//     const netAmount = type === 'credit' ? amount * -1 : amount;
    
//     return (
//       <tr>
//         <td>{date}</td>
//         <td>{transaction}</td>
//         <td>{formatNumber(netAmount)}</td>
//       </tr>
//     )
//   }
// }

function App() {  
  return (
    <main>
      <Sidebar />
      <MainContent users={DATA} />
    </main>
  );
}

export default App;
