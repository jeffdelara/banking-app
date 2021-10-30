import { Account } from './Account';

export const MainClientContent = props => {
    const {user} = props;
  
    return (
      <section id="main-content">
        <h1 className="main">My Account</h1>
        <Account type={user.type} accountNumber={user.number} balance={user.balance} fullname={user.fullname} />
      </section>
    )
}
