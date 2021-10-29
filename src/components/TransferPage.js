import { useState } from "react";
import { Notif } from "./Notif";
import { formatNumber } from "./Utils";

export const TransferPage = (props) => {

    const [users, setUsers] = useState(props.users); 
    const [receivers, setReceivers] = useState(users);
    const [sender, setSender] = useState({balance: 0});
    const [receiver, setReceiver] = useState({balance: 0});
    const [notif, setNotif] = useState({message: '', style: ''});
    const [transferAmount, setTransferAmount] = useState(0);

    const senderSelected = (event) => {
        const accountNumber = event.target.value;

        const newUsers = [];
        let sender = null; 

        users.forEach(user => {
            if(user.number === accountNumber) {
                sender = user;        
            } else {
                newUsers.push(user);
            }
        })

        setSender(sender);
        setReceivers(newUsers);
        setReceiver({number: 0, balance: 0});
    }

    const receiverSelected = event => {
        const accountNumber = event.target.value;

        let receiver = null;

        users.forEach(user => {
            if(user.number === accountNumber) {
                receiver = user;
            }
        })

        setReceiver(receiver);
    }

    const senders = users.map(user => {
        return (
            <option value={user.number}>{user.fullname} #{user.number}</option>
        )
    });

    const newReceivers = receivers.map(receiver => {
        return (
            <option value={receiver.number}>{receiver.fullname} #{receiver.number}</option>
        )
    })

    const transferFund = event => {
        event.preventDefault();
        const amount = parseFloat(event.target.elements.amount.value.replace(/,/g, ''));
        if(amount <= 0) return false;

        console.log("Transfer");
        // get localstorage users
        const users = JSON.parse(localStorage.getItem('users'));

        if(sender.number !== 0 && receiver.number !== 0) {
            // deduct from sender
            let senderSuccess = false;
            users.forEach(user => {
                if(user.number === sender.number) {
                    if(user.balance - amount >= 0) {
                        user.balance -= amount;
                        setSender(user);
                        senderSuccess = true;
                    }
                }
            });

            // add to receiver 
            if(senderSuccess) {
                users.forEach(user => {
                    if(user.number === receiver.number) {
                        user.balance += amount;
                        setReceiver(user);
                    }
                });

                setNotif({ message: 'Successful transfer.', style: 'success' });
                setUsers(users);
                props.setUsers(users);
                localStorage.setItem('users', JSON.stringify(users));
                setTransferAmount(0);
            } 
            else {
                setNotif({message: 'Transfer failed.', style: 'danger'});
            }
        }
        else {
            setNotif({message: 'Incomplete information. Missing sender or receiver.', style: 'danger' });
        }
    }

    const onTransfer = (e) => {
        const transfer = parseFloat(e.target.value.replace(/,/g, '')) || 0;
        setTransferAmount(transfer);
    }

    return (
        <section id="main-content">
            <form id="form" onSubmit={transferFund}>
                <h1>Fund Transfer</h1>
                
                <Notif message={notif.message} style={notif.style} />
                <h2>Sender</h2>
                <label>From (Sender)</label>
                <select onChange={senderSelected} name="sender">
                    <option>Select Sender</option>
                    {senders}
                </select>

                <label>Current balance</label>
                <input type="text" className="right" value={formatNumber(sender.balance)} disabled />
                <label>Amount to Transfer</label>
                <input type="text" name="amount" value={formatNumber(transferAmount)} onChange={onTransfer} autoComplete="off" className="right big-input" />

                <div className="transfer-icon"><i class='bx bx-down-arrow-alt'></i></div>
                <h2>Receiver</h2>
                <label>To (Receiver)</label>
                <select value={receiver.number || 0} onChange={receiverSelected} name="receiver">
                    <option>Select Receiver</option>
                    {newReceivers}
                </select>
                <label>Current balance</label>
                <input type="text" className="right" value={formatNumber(receiver.balance)} disabled />
                <input type="submit" className="btn" value="Transfer Fund" />
            </form>
        </section>
    )
}
