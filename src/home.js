/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

import React, { useState, useEffect } from 'react';
import './Home.css';
import idb from './idb';

const Home = () => {
    useEffect(() => {
        document.title = "Cost Manager";
    }, []);

    // These state variables are used to store the values of the inputs
    const [date, setDate] = useState('');
    const [item, setItem] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('food');
    const [description, setDescription] = useState('');
    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState('');

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    // The "formatDate" function responsible for the date to be in a "DD-MM-YYYY" format (solution to the date problem).
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;
    }

    // Fetch the expenses from IndexedDB
    useEffect(() => {
        idb.getAllCosts()
            .then(costs => {
                setInputs(costs);
            })
            .catch(error => {
                console.error("Error retrieving costs:", error.message);
            });
    }, []);

    const handleAddCost = () => {
        if (!date || !item || !price) {
            setError("Please fill in all fields");
            return;
        }

        setError('');

        const costData = {
            date,
            item,
            price: parseInt(price),
            category,
            description,
            timestamp: new Date(date).toISOString()
        };

        idb.addCost(costData)
            .then(() => {
                // The updated list of costs will be fetched from IndexedDB and set to the state (solution to the deletion problem).
                idb.getAllCosts()
                    .then(costs => {
                        setInputs(costs);
                    })
                    .catch(error => {
                        console.error("Error retrieving costs:", error.message);
                    });

                setDate('');
                setItem('');
                setPrice('');
                setCategory('food');
                setDescription('');
                alert("Cost added successfully.");
            })
            .catch(error => {
                console.error("Error adding cost:", error.message);
            });
    };

    const handleDeleteCost = (index) => {
        console.log("Deleting cost at index:", index);
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);

        const costItem = inputs[index];
        if (!costItem || !costItem.id) {
            console.error("Invalid cost item or cost ID.");
            return;
        }

        const costIdToDelete = costItem.id;
        console.log("Deleting cost with ID:", costIdToDelete);

        idb.deleteCost(costIdToDelete)
            .then(() => {
                setInputs(updatedInputs);
                alert("Cost deleted successfully.");
            })

            .catch(error => {
                console.error("Error deleting cost:", error.message);
            });
    };


    return (
        <div className="Home">
            <h1>What did you spend your money on?</h1>
            <div className="form-container">
                <div className="inputGroup">
                    <label htmlFor='name'>Date:</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} required autoComplete={'off'} max={todayStr} />

                </div>
                <div className="inputGroup">
                    <label>Item: </label><input type="text" value={item} onChange={e => setItem(e.target.value)}/>
                </div>
                <div className="inputGroup">
                    <label>Price: </label><input type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                <div className="inputGroup">
                    <label>Category:</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="food">Food</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="travel">Travel</option>
                        <option value="housing">Housing</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <label>Description: </label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}
                              placeholder="Enter description"></textarea>
                </div>
                <div className="submit-cost">
                    <button className={"add-cost"} id="plus" onClick={handleAddCost}>
                        Add to list
                    </button>
                    {error && <p className="error">{error}</p>}
                </div>

            </div>

            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Delete item</th>
                </tr>
                </thead>
                <tbody>
                {inputs.map((input, index) => ( // Map over the inputs state variable.
                    <tr key={index}>
                        <td>{formatDate(input.timestamp)}</td>
                        <td>{input.item}</td>
                        <td>{input.price}</td>
                        <td>{input.category}</td>
                        <td>{input.description}</td>
                        <td>
                            <button
                                className={'delete-button'}
                                onClick={() => handleDeleteCost(index)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>

    );
}
export default Home;