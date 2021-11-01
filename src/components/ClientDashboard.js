import React, {useState} from 'react';
import { Sidebar } from './Sidebar';
import { MainClientContent } from './MainClientContent';
import { findAccount } from './Utils';
import { TransferPage } from './TransferPage';
import { BudgetApp } from './BudgetApp';

export const ClientDashboard = (props) => {
    const { logout, client, setClient } = props;
    const [users, setUsers] = useState(props.users);
    const [ page, setPage ] = useState('home');

  
    const changePageHandler = (pageName) => {
      setPage(pageName);
      const currentUser = findAccount(client.number);
      setClient(currentUser);
    }
  
    if(page === 'home') {
      
      return (
        <main>
          <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
          <MainClientContent user={client} />
        </main>
      )
    }
  
    if(page === 'budget') {
      return (
        <main>
          <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
          <BudgetApp client={client} />
        </main>
      )
    }
  
    if(page === 'transfer') {
      return (
        <main>
          <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
          <TransferPage isClient="true" client={client} setClient={setClient} users={users} setUsers={setUsers}  />
        </main>
      )
    }
}
