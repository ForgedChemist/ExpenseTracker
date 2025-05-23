import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ExpenseSummary = ({ expenses, exchangeRates, deleteExpense, deleteAllExpenses, deleteExpensesByMonth }) => {
  const [groupBy, setGroupBy] = useState('category');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [chartData, setChartData] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6A7FDB'];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get list of unique years from expenses
  const years = [...new Set(expenses.map(expense => new Date(expense.date).getFullYear()))].sort();

  // If there are no expenses, add current year
  if (years.length === 0) {
    years.push(new Date().getFullYear());
  }

  useEffect(() => {
    if (expenses.length === 0) return;

    // Convert to base currency
    const convertedExpenses = expenses.map(expense => ({
      ...expense,
      convertedAmount: expense.currency === baseCurrency
        ? expense.amount
        : expense.amount / exchangeRates[expense.currency] * exchangeRates[baseCurrency]
    }));

    // Group expenses by selected category
    const grouped = {};
    convertedExpenses.forEach(expense => {
      const key = groupBy === 'category' 
        ? expense.category 
        : new Date(expense.date).toLocaleDateString();

      if (!grouped[key]) {
        grouped[key] = {
          items: [],
          total: 0
        };
      }
      
      grouped[key].items.push(expense);
      grouped[key].total += expense.convertedAmount;
    });

    setGroupedExpenses(grouped);

    // Format data for pie chart
    const data = Object.keys(grouped).map((key, index) => ({
      name: key,
      value: grouped[key].total,
      color: COLORS[index % COLORS.length]
    }));

    setChartData(data);
    
  }, [expenses, groupBy, baseCurrency, exchangeRates, COLORS]);

  const renderExtraInfo = (key, data) => {
    if (groupBy === 'category') {
      // For category grouping, show dates of expenses
      const dates = [...new Set(data.items.map(item => new Date(item.date).toLocaleDateString()))];
      return (
        <div className="extra-info">
          <p>Dates: {dates.join(', ')}</p>
        </div>
      );
    } else {
      // For date grouping, show categories of expenses
      const categories = [...new Set(data.items.map(item => item.category))];
      return (
        <div className="extra-info">
          <p>Categories: {categories.join(', ')}</p>
        </div>
      );
    }
  };

  const handleDeleteMonth = () => {
    deleteExpensesByMonth(currentMonth, currentYear);
  };

  // Create status message to show selected expenses to delete
  const getMonthlyExpenseCount = () => {
    if (expenses.length === 0) return 0;
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    }).length;
  };

  const monthlyExpenseCount = getMonthlyExpenseCount();

  return (
    <div className="expense-summary">
      <div className="summary-header">
        <div className="summary-options">
          <div className="option-group">
            <label>Group by:</label>
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="category">Category</option>
              <option value="date">Date</option>
            </select>
          </div>
          
          <div className="option-group">
            <label>Display Currency:</label>
            <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="TRY">TRY (₺)</option> {/* Added TRY */}
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>

        <div className="delete-options">
          <div className="month-selector">
            <select 
              value={currentMonth} 
              onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <select 
              value={currentYear} 
              onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button 
              className="delete-btn delete-month" 
              onClick={handleDeleteMonth}
              disabled={monthlyExpenseCount === 0}
            >
              Delete Month ({monthlyExpenseCount} expenses)
            </button>
          </div>
          <button 
            className="delete-btn delete-all" 
            onClick={deleteAllExpenses}
            disabled={expenses.length === 0}
          >
            Delete All ({expenses.length} expenses)
          </button>
        </div>
      </div>

      <div className="chart-container">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)} ${baseCurrency}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No expense data to display</p>
        )}
      </div>

      <div className="expense-breakdown">
        <h3>Expense Breakdown</h3>
        {Object.keys(groupedExpenses).length > 0 ? (
          <div className="expense-groups">
            {Object.entries(groupedExpenses).map(([key, data]) => (
              <div key={key} className="expense-group">
                <h4>{key}</h4>
                <p className="group-total">Total: {data.total.toFixed(2)} {baseCurrency}</p>
                {renderExtraInfo(key, data)}
                <details>
                  <summary>View Details</summary>
                  <ul className="expense-list">
                    {data.items.map(expense => (
                      <li key={expense.id}>
                        <div className="expense-item">
                          <div className="expense-details">
                            {expense.description || 'Unnamed expense'}: {expense.amount} {expense.currency} 
                            {expense.currency !== baseCurrency && 
                              ` (${expense.convertedAmount.toFixed(2)} ${baseCurrency})`}
                          </div>
                          <button 
                            className="delete-expense-btn" 
                            onClick={() => deleteExpense(expense.id)}
                            title="Delete expense"
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        ) : (
          <p>No expenses to display</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseSummary;
