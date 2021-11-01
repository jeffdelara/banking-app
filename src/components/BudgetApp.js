import { formatNumber, saveBudgetToDB } from "./Utils";
import React, {useState} from "react";

export const BudgetApp = (props) => {
    const {client} = props;
    const [budgetList, setBudgetList] = useState(client.budget || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalValue, setModalValue] = useState({title: '', amount: ''});
    const [modalAction, setModalAction] = useState('add');

    const getTotalExpenses = () => {
        return budgetList.reduce((prev, curr) => {
            return prev + curr.amount;
        }, 0);
    }

    const totalExpenses = getTotalExpenses();
    
    const [currentBalance, setCurrentBalance] = useState(client.balance - totalExpenses);

    const addBudget = (e) => {
        e.preventDefault();
        setModalValue({title: '', amount: ''});
        setModalAction('add');
        setIsModalOpen(true);
    }

    const saveBudget = (amount, title) => {
        amount = parseFloat(amount);
        if(amount > 0) {
            // deduct current balance
            setCurrentBalance(currentBalance - amount);
            // add this budget to budgetList
            const newBudgetList = [{title: title, amount: amount}, ...budgetList];
            setBudgetList(newBudgetList);
            // close
            setIsModalOpen(false);
            // save into localStorage this new budget
            saveBudgetToDB(client.number, newBudgetList);
        }
    }

    const updateBudget = ({id, amount, title}) => {
        const budget = budgetList[id];
        budget.title = title;
        budget.amount = amount;

        setBudgetList(budgetList);
        saveBudgetToDB(client.number, budgetList);
        const total = getTotalExpenses(budgetList);
        // compute total balance
        setCurrentBalance(client.balance - total);
        setIsModalOpen(false);
    }

    const editRow = (index) => {
        const budget = budgetList[index];
        budget.id = index;

        setModalValue(budget);
        setModalAction('edit');
        setIsModalOpen(true);
    }

    const deleteRow = (index) => {
        // get all budgetlist except the index
        const filteredBudget = budgetList.filter((item, budgetIndex) => {
            return  index !== budgetIndex;
        })

        setCurrentBalance(currentBalance + budgetList[index].amount);
        setBudgetList(filteredBudget);
        saveBudgetToDB(client.number, filteredBudget);
    }

    const modal = isModalOpen ? <BudgetModal 
                  title={modalValue.title}
                  id={modalValue.id}
                  amount={modalValue.amount}
                  modalAction={modalAction} 
                  setIsModalOpen={setIsModalOpen}
                  saveBudget={saveBudget} 
                  updateBudget={updateBudget} /> : '';


    const budget = budgetList.map((item, index) => {
        const style = index % 2 === 0 ? 'even' : 'odd';
        return (
            <div className={`budget-row ${style}`}>
                <div className="budget-title">
                    <button type="button" onClick={() => deleteRow(index)} className="mr"><i class='bx bxs-x-square' ></i></button>
                    <button type="button" onClick={() => editRow(index)} className="mr"><i class='bx bx-edit-alt' ></i></button>
                    <span onClick={() => editRow(index)}>{item.title}</span>
                </div>
                <div>{formatNumber(item.amount)}</div>
            </div>
        )
    })

    return (
        <div id="main-content">
            <form id="form" className="budget">
                <h1>Budget App</h1>
                <div>Start budgeting your money with our built in app.</div>

                <div id="budget">
                    <div className="budget-menu">
                        <div>
                            <button className="btn2" onClick={addBudget}><i className='bx bx-book-add'></i> Add budget</button>
                        </div>
                        <div>
                          <label>Remaining Budget</label>
                          <h1 className={ currentBalance < 0 ? 'danger' : '' }>{formatNumber(currentBalance)}</h1>
                        </div>
                    </div>

                    <div className="budget-body">
                        {budget}
                    </div>
                </div>
            </form>
            {modal}
        </div>
    )
}

const BudgetModal = (props) => {
    const { saveBudget, updateBudget, setIsModalOpen, title, amount, modalAction, id} = props;
    const [modalValue, setModalValue] = useState({id: id, title: title, amount: amount });
    // add or edit?
    const [action, setAction] = useState(modalAction);

    const onSubmit = (e) => {
        e.preventDefault();

        if(action === 'add') {
            saveBudget(modalValue.amount, modalValue.title);
        }

        if(action === 'edit') {
            updateBudget(modalValue);

        }
    }

    const onChangeDescription = (e) => {
        setModalValue({...modalValue, title: e.target.value});
    }

    const onChangeAmount = (e) => {
        setModalValue({...modalValue, amount: parseFloat(e.target.value)});
    }

    return (<div className="overlay">
        <div className="modal">
            <form onSubmit={onSubmit}>
                <h2 className="title">{action} budget</h2>
                <label>description</label>
                <textarea name="title" onChange={onChangeDescription} defaultValue={modalValue.title}></textarea>
                <label>Amount</label>
                <input type="number" name="amount" onChange={onChangeAmount} value={modalValue.amount} autoComplete="off" />
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn2 btn-muted">Cancel</button>
                <button type="submit" className="btn2">{action} Budget</button>
            </form>
        </div>
    </div>
    )
}
