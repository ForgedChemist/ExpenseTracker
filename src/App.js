import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseSummary from './components/ExpenseSummary';
import { loadExpenses, saveExpenses, clearExpenses, isStorageAvailable } from './utils/storage';

// Simple page wrapper component
const Page = ({ children, title }) => (
  <div className="page">
    <h2 className="page-title">{title}</h2>
    {children}
  </div>
);

function App() {
  const [expenses, setExpenses] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110.5,
  });
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Check storage availability and load expenses on first render
  useEffect(() => {
    const storageWorks = isStorageAvailable();
    setStorageAvailable(storageWorks);
    
    if (storageWorks) {
      const savedExpenses = loadExpenses();
      setExpenses(savedExpenses);
    }
  }, []);

  // Save expenses whenever they change
  useEffect(() => {
    if (storageAvailable && expenses.length > 0) {
      saveExpenses(expenses);
    }
  }, [expenses, storageAvailable]);

  const addExpense = (expense) => {
    const newExpenses = [...expenses, { ...expense, id: Date.now() }];
    setExpenses(newExpenses);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    
    // Make sure we save right away
    if (storageAvailable) {
      saveExpenses(updatedExpenses);
    }
  };

  const deleteAllExpenses = () => {
    if (window.confirm('Are you sure you want to delete all expenses?')) {
      setExpenses([]);
      
      // Clear storage
      if (storageAvailable) {
        clearExpenses();
      }
    }
  };

  const deleteExpensesByMonth = (month, year) => {
    const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
    if (window.confirm(`Are you sure you want to delete all expenses for ${monthName} ${year}?`)) {
      const updatedExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return !(expenseDate.getMonth() === month && expenseDate.getFullYear() === year);
      });
      
      setExpenses(updatedExpenses);
      
      // Make sure we save right away
      if (storageAvailable) {
        saveExpenses(updatedExpenses);
      }
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Expense Tracker</h1>
          <nav>
            <Link to="/" className="nav-link">Add Expense</Link>
            <Link to="/summary" className="nav-link">View Summary</Link>
          </nav>
        </header>
        {!storageAvailable && (
          <div className="storage-warning">
            Warning: Local storage is not available. Your expenses will not be saved between sessions.
          </div>
        )}
        <main className="App-content">
          <Routes>
            <Route path="/" element={
              <Page title="Add New Expense">
                <ExpenseForm addExpense={addExpense} />
              </Page>
            } />
            <Route path="/summary" element={
              <Page title="Expense Summary">
                <ExpenseSummary 
                  expenses={expenses} 
                  exchangeRates={exchangeRates} 
                  deleteExpense={deleteExpense}
                  deleteAllExpenses={deleteAllExpenses}
                  deleteExpensesByMonth={deleteExpensesByMonth}
                />
              </Page>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
