import React, {useState} from 'react';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { Account } from './Account';
import { findAccount } from './Utils';

export const ClientDashboard = (props) => {
    const { logout, client, setClient } = props;
    const [ page, setPage ] = useState('home');
  
    const changePageHandler = (pageName) => {
      setPage(pageName);
      const currentUser = findAccount(client.number);
      setClient(currentUser);
    }
  
    if(page === 'home') {
      
      return (
        <main>
          <Sidebar changePage={changePageHandler} user={client} logoutHandler={props.logout} />
          <MainClientContent user={client} />
        </main>
      )
    }
  
    if(page === 'budget') {
      return (
        <main>
          <Sidebar changePage={changePageHandler} user={client} logoutHandler={props.logout} />
          <h1>Budget</h1>
        </main>
      )
    }
  
    if(page === 'transfer') {
      return (
        <main>
          <Sidebar changePage={changePageHandler} user={client} logoutHandler={props.logout} />
          <h1>Transfer</h1>
        </main>
      )
    }
  }
  
const MainClientContent = props => {
    const {user} = props;
  
    return (
      <section id="main-content">
        <h1 className="main">My Account</h1>
        <Account type={user.type} accountNumber={user.number} balance={user.balance} fullname={user.fullname} />
      </section>
    )
}
