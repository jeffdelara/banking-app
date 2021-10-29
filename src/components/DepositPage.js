import { useState } from "react";
import { Notif } from "./Notif";
import { formatNumber, findAccount, transact, trim } from "./Utils";

export const DepositPage = (props) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const starting = {message: 'Deposit money to an account.', style: 'left'};
    const [notif, setNotif] = useState(starting);
    const [accounts, setAccounts] = useState(users);
    const [selectedAccount, setSelectedAccount] = useState({balance: 0});
    const [depositAmount, setDepositAmount] = useState(0);

    const options = accounts.map(user => {
        return <option value={user.number}>{user.fullname} #{user.number}</option>
    });

    const displayBalance = (e) => {
        setNotif(starting);
        const selectedNumber = e.target.value;
        
        for(const user of accounts) {
            if(user.number === selectedNumber) {
                setSelectedAccount(user);
                break;
            }
        }
    }

    const onDeposit = (e) => {
        const amount = formatNumber(trim(e.target.value));
        setDepositAmount(amount);
    }

    const processTransfer = (e) => {
        e.preventDefault();
        const amount = trim(e.target.elements.amount.value);
        const accountNumber = e.target.elements.account.value;

        if(amount > 0 && accountNumber !== "0") {
            // console.log(selectedAccount, amount);
            // find in accounts
            for(const user of accounts) {
                if(user.number === accountNumber) {
                    transact(user.number, amount, 'add', props.setUsers);
                    setSelectedAccount(findAccount(user.number));
                    setAccounts(JSON.parse(localStorage.getItem('users')));
                    setDepositAmount(0);
                    setNotif({message: 'Deposit successful.', style: 'success'});
                    break;
                }
            }
        } 
        else {
            setNotif({message: 'Deposit failed.', style: 'danger'});
        }
    }

    return (
        <section id="main-content">
            <form id="form" onSubmit={processTransfer}>
                <h1>Deposit</h1>
                <Notif message={notif.message} style={notif.style} />
                <label>Account</label>
                <select name="account" onChange={displayBalance}>
                    <option value="0">Select Account</option>
                    {options}
                </select>

                <label>Current balance</label>
                <input type="text" className="right" value={formatNumber(selectedAccount.balance)} disabled />
                
                <div className="transfer-icon"><i class='bx bx-plus'></i></div>
                <label>Amount to Deposit</label>
                <input type="text" name="amount" value={depositAmount} onChange={onDeposit} autoComplete="off" className="right big-input" />
                <button type="submit" className="btn">Deposit</button>
            </form>
        </section>
    )
}
