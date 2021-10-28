import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";

const CreateAccountPage = (props) => {
    const [notif, setNotif] = useState('');

    const createRandomAccount = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000);
    }

    const createNewAccount = (user) => {
        const localUsers = props.users;

        let alreadyExists = false;
        localUsers.forEach(row => {
            if(row.email === user.email) {
                alreadyExists = true;
            }
        });

        if(alreadyExists) {
            setNotif('This email already exists. Try again.');
            return false;
        } else {
            setNotif('');
            localUsers.unshift(user);
            props.setUsers(localUsers); 
            localStorage.setItem('users', JSON.stringify(localUsers));
            setNotif('Successfully saved.');
            return true;
        }
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        const user = event.target.elements;

        const account = {
            email: user.email.value,
            password: user.password.value,
            fullname: user.fullname.value,
            type: user.accountType.value,
            number: user.accountNumber.value,
            isAdmin: false,
            balance: parseFloat(user.initialBalance.value)
        }

        const isSaved = createNewAccount(account);
        if(isSaved) {
            user.email.value = '';
            user.password.value = '';
            user.fullname.value = ''; 
            user.accountNumber.value = createRandomAccount();
            user.initialBalance.value = 0;
        }
    }

    return (
        <section id="main-content">
            <form id="form" onSubmit={handleCreateAccount}>
                <h1>Create Account</h1>
                <div className="notif danger">{notif}</div>
                <label htmlFor="fullname">Full name</label>
                <input id="fullname" type="text" name="fullname" />
                <hr />
                <label htmlFor="account-number">Account # (Randomly Generated)</label>
                <input id="account-number" name="accountNumber" value={createRandomAccount()} type="number" disabled />

                <label htmlFor="balance">Initial balance</label>
                <input id="balance" type="number" name="initialBalance" />

                <label htmlFor="account-type">Account Type</label>
                <select name="accountType">
                    <option value="Checking Account">Checking Account</option>
                    <option value="Savings Accounts">Savings Account</option>
                </select>
                <hr />
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="email" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" />
                <input value="Create Account" className="btn" type="submit" />
            </form>
        </section>
    )
}

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
              <h1>Transfer</h1>
            </main>
        )
    }
}
