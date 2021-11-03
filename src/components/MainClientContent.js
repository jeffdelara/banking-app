import { Account } from './Account';
import { formatNumber } from './Utils';

export const MainClientContent = props => {
    const {user} = props;
    console.log(user);

    const transactions = user.transactions.map((transaction, index) => {
      const className = index % 2 === 0 ? 'even' : 'odd'
      return <div className={`transaction-item ${className}`}>
        <div>{transaction.date}</div>
        <div>{transaction.title}</div>
        <div>{transaction.type === 'debit' ? formatNumber(transaction.amount * -1) : formatNumber(transaction.amount)}</div>
      </div>
    });


    return (
      <section id="main-content">
        <h1 className="main">My Account</h1>
        <Account type={user.type} accountNumber={user.number} balance={user.balance} fullname={user.fullname} />
        <div id="transactions">
          <h2>Transactions</h2>
          <div id="transaction-div">
          {transactions}
          </div>
        </div>
      </section>
    )
}
