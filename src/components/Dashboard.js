import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { MainContent } from "./MainContent";
import { CreateAccountPage } from "./CreateAccountPage";
import { TransferPage } from "./TransferPage";
import { TransactPage } from "./TransactPage";

export const Dashboard = (props) => {
    const [page, setPage] = useState('home');
    const [users, setUsers] = useState(props.users);
    const [notif, setNotif] = useState({message: '', style: ''});
    const [editingUser, setEditingUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);
    const [editModal, setEditModal] = useState(false);

    const changePageHandler = (pageName) => {
        setPage(pageName);

        if(pageName === 'withdraw') {
            setNotif({message: 'Select an account to withdraw money from.', style: 'left'});
        } 

        if(pageName === 'deposit') {
            setNotif({message: 'Select an account to deposit money.', style: 'left'});
        }
    }

    useEffect(() => {
        console.log(deleteUser);
        if(deleteUser !== null) {
            console.log('Delete user with index: ', deleteUser);
            const filteredUsers = users.filter((user, index) => {
                return index !== deleteUser
            });

            console.log(filteredUsers);
            setUsers(filteredUsers);
            setDeleteUser(null);
            // save
            localStorage.setItem('users', JSON.stringify(filteredUsers));
        }
    }, [deleteUser]);

    let modal = null;
    if(editingUser !== null && editModal) {
        const user = users[editingUser];
        // accountName={} accountNumber={} balance={}
        modal = <AccountEditModal 
            accountName={user.fullname} 
            accountNumber={user.number} 
            balance={user.balance} setEditModal={setEditModal}  />
    }

    if(page === 'home') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <MainContent users={users} editingUser={editingUser} 
                setEditModal={setEditModal} 
                setEditingUser={setEditingUser} setDeleteUser={setDeleteUser} />
              {modal}
            </main>
        )
    }

    if(page === 'create-account') {
        return (
            <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <CreateAccountPage users={users} setUsers={setUsers} />
            </main>
        )
    }

    if(page === 'transfer') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <TransferPage users={users} setUsers={setUsers} />
            </main>
        )
    }

    if(page === 'deposit') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="add" page={page} />
            </main>
        )
    }

    if(page === 'withdraw') {
        return (
            <main>
                <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
                <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="subtract" page={page} />
            </main>
        )
    }
}

const AccountEditModal = (props) => {
    const { accountName, accountNumber, balance, setEditModal } = props;
    const [account, setAccount] = useState({name: accountName, number: accountNumber, balance: balance});

    const closeModal = () => {
        setEditModal(false);
    }

    const updateAccount = (e) => {
        e.preventDefault();
        console.log("Update");
    }
 
    return (
        <div className="overlay">
        <div className="modal">
            <form onSubmit={updateAccount}>
                <h2 className="title">Edit Account</h2>
                <label>Account name</label>
                <input name="account-name" value={account.name} autoComplete="off" />
                
                <label>Account number</label>
                <input type="text" name="amount" value={account.number} autoComplete="off" />

                <label>Balance</label>
                <input type="text" name="balance" value={account.balance} autoComplete="off" />

                <button type="button" onClick={() => closeModal()} className="btn2 btn-muted">Cancel</button>
                <button type="submit" className="btn2">Update Account</button>
            </form>
        </div>
    </div>
    )
}
