import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { CreateAccountPage } from "./CreateAccountPage";
import { TransferPage } from "./TransferPage";
import { TransactPage } from "./TransactPage";

export const Dashboard = (props) => {
    const [page, setPage] = useState('home');
    const [users, setUsers] = useState(props.users);
    const [notif, setNotif] = useState({message: '', style: ''});

    const changePageHandler = (pageName) => {
        setPage(pageName);

        if(pageName === 'withdraw') {
            setNotif({message: 'Select an account to withdraw money from.', style: 'left'});
        } 

        if(pageName === 'deposit') {
            setNotif({message: 'Select an account to deposit money.', style: 'left'});
        }
        
    }

    if(page === 'home') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
              <MainContent users={users} />
            </main>
        )
    }

    if(page === 'create-account') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
              <CreateAccountPage users={users} setUsers={setUsers} />
            </main>
        )
    }

    if(page === 'transfer') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
                <TransferPage users={users} setUsers={setUsers} />
            </main>
        )
    }

    if(page === 'deposit') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
                <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="add" page={page} />
            </main>
        )
    }

    if(page === 'withdraw') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
                <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="subtract" page={page} />
            </main>
        )
    }
}
