import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { CreateAccountPage } from "./CreateAccountPage";
import { TransferPage } from "./TransferPage";
import { DepositPage } from "./DepositPage";

export const Dashboard = (props) => {
    const [page, setPage] = useState('home');
    const [users, setUsers] = useState(props.users);

    const changePageHandler = (pageName) => {
        setPage(pageName);
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
                <DepositPage users={users} setUsers={setUsers} />
            </main>
        )
    }

    if(page === 'withdraw') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} logoutHandler={props.logoutHandler} />
                <h1>Withdraw</h1>
            </main>
        )
    }
}
