import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const predefinedCategories = ['Food', 'Transportation', 'Housing', 'Utilities', 'Entertainment', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedCategory = category === 'custom' ? customCategory : category;
    
    const newExpense = {
      amount: parseFloat(amount),
      currency,
      category: selectedCategory,
      date,
      description,
      timestamp: new Date().toISOString()
    };
    
    addExpense(newExpense);
    
    // Reset form
    setAmount('');
    setCategory('');
    setCustomCategory('');
    setDescription('');
    // Keep the current date
    
    // Show success message
    setSuccessMessage('Expense added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="expense-form-container">
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {predefinedCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="custom">Custom category</option>
          </select>
        </div>

        {category === 'custom' && (
          <div className="form-group">
            <label htmlFor="customCategory">Custom Category:</label>
            <input
              type="text"
              id="customCategory"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <button type="submit" className="submit-btn">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
