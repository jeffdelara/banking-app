import { Account } from "./Account";

export const MainContent = (props) => {
    const users = props.users;
      
    const bankAccounts = users.map((user, index) => {
      return <Account key={index} fullname={user.fullname} 
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

