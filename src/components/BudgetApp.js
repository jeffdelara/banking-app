import { formatNumber, saveBudgetToDB } from "./Utils";
import React, {useState} from "react";

export const BudgetApp = (props) => {
    const {client} = props;
    const [budgetList, setBudgetList] = useState(client.budget || []);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const balanceWithBudget = budgetList.reduce((prev, curr) => {
        return prev + curr.amount
    }, 0);
    
    const [currentBalance, setCurrentBalance] = useState(client.balance - balanceWithBudget);

    const addBudget = (e) => {
        e.preventDefault();
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

    const editRow = (e) => {
        console.log('Edit', e);
    }

    const deleteRow = (index) => {
        console.log('Delete', index);
    }

    const modal = isModalOpen ? <BudgetModal 
                  title="Add a budget" 
                  setIsModalOpen={setIsModalOpen}
                  saveBudget={saveBudget} /> : '';


    const budget = budgetList.map((item, index) => {
        const style = index % 2 === 0 ? 'even' : 'odd';
        return (
            <div className={`budget-row ${style}`}>
                <div className="budget-title">
                    <button type="button" onClick={() => deleteRow(index)} className="mr"><i class='bx bxs-x-square' ></i></button>
                    <button type="button" onClick={() => editRow(index)} className="mr"><i class='bx bx-edit-alt' ></i></button>
                    {item.title}
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
                          <h1>{formatNumber(currentBalance)}</h1>
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
    const {title, saveBudget, setIsModalOpen} = props;
    const onSubmit = (e) => {
        e.preventDefault();
        saveBudget(e.target.elements.amount.value, e.target.elements.description.value);
    }
    return (<div className="overlay">
        <div className="modal">
            <form onSubmit={onSubmit}>
                <h2>{title}</h2>
                <label>description</label>
                <textarea name="description"></textarea>
                <label>Amount</label>
                <input type="number" name="amount" autoComplete="off" />
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn2 btn-muted">Cancel</button>
                <button type="submit" className="btn2">Submit</button>
            </form>
        </div>
    </div>
    )
}
