/**
 * Storage utility for the Expense Tracker application
 */

const STORAGE_KEY = 'expense_tracker_data';

/**
 * Save expenses to localStorage
 * @param {Array} expenses - Array of expense objects
 * @returns {boolean} - Success status
 */
export const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Load expenses from localStorage
 * @returns {Array|null} - Array of expense objects or null if error/empty
 */
export const loadExpenses = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

/**
 * Clear all saved expenses
 * @returns {boolean} - Success status
 */
export const clearExpenses = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

/**
 * Add a single expense and update storage
 * @param {Array} currentExpenses - Current expense array
 * @param {Object} newExpense - New expense object to add
 * @returns {Array} - Updated expenses array
 */
export const addAndSaveExpense = (currentExpenses, newExpense) => {
  const updatedExpenses = [...currentExpenses, { ...newExpense, id: Date.now() }];
  saveExpenses(updatedExpenses);
  return updatedExpenses;
};

/**
 * Check if storage is available
 * @returns {boolean} - Whether localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};
