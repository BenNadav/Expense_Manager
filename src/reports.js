/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

import React, {useState, useEffect} from 'react';
import './Reports.css';
import idb from './idb';

const Reports = () => {
    useEffect(() => {
        document.title = 'Reports';
    }, []);

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [categories, setCategories] = useState({}); // Use state to manage categories

    // The "formatDate" function responsible for the date to be in a "DD-MM-YYYY" format (solution to the date problem).
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;
    }

    // Fetch all the expenses from the database.
    useEffect(() => {
        idb.getAllCosts()
            .then(costs => {
                setExpenses(costs);
            })
            .catch(error => {
                console.error("Error retrieving costs:", error.message);
            });
    }, []);

    // Calculate the total expenses for the filtered expenses.
    const calculateTotalExpenses = () => {
        if (selectedYear && selectedMonth) {
            const filtered = expenses.filter(exp => {
                const expDate = new Date(exp.timestamp);
                return (
                    expDate.getFullYear().toString() === selectedYear &&
                    expDate.getMonth().toString() === selectedMonth
                );
            });
            setFilteredExpenses(filtered);

            let total = 0;
            const newCategories = {};

            filtered.forEach(expense => {
                total += parseInt(expense ? expense.price : 0);

                if (newCategories[expense.category]) {
                    newCategories[expense.category] += parseInt(expense.price);
                } else {
                    newCategories[expense.category] = parseInt(expense.price);
                }
            });

            /*
            It is important to make sure that we reset or initialize the categories object properly when generating
            a new report (solution to the reports problem).
             */
            setTotalExpenses(total);
            setCategories(newCategories);
        } else {
            alert('Please select a year and a month');
        }
    };

    return (
        <div className="reports">
            <h1 className="headline">Expense Report</h1>
            <div className="select-container">
                <label className="label">Month:</label>
                <select className="select" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                    <option value="" disabled>Select a month</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>
            </div>
            <div className="select-container">
                <label className="label">Year:</label>
                <select className="select" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                    <option value="" disabled>Select a year</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                </select>
            </div>
            <div>
                <button className="submit" onClick={calculateTotalExpenses}>Generate Report</button>
            </div>
            {filteredExpenses.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredExpenses.map((expense, index) => (
                        <tr key={index}>
                            <td>{formatDate(expense.timestamp)}</td>
                            <td>{expense.item}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                            <td>{expense.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div>
                <p className="total-expenses">Below is a breakdown of your expenses: <span
                    className="total-number">{totalExpenses} ILS</span></p>
            </div>
            <div>
                <p className="total-expenses">Expenses by category:</p>
                {Object.keys(categories).map(category => (
                    <p key={category}>{category}: {categories[category]} ILS</p>
                ))}
            </div>
        </div>
    );
}

export default Reports;