# ExpenseTracker Application

ExpenseTracker is a React-based web application designed to help users track their expenses. It provides a user-friendly interface for entering new expenses and a comprehensive summary page with visualizations and detailed breakdowns.

## Features

*   **Expense Entry:**
    *   Enter expense amount.
    *   Select currency (USD, EUR, GBP, JPY, TRY).
    *   Choose from predefined categories (Food, Transportation, Housing, Utilities, Entertainment, Other) or add a custom category.
    *   Select the date of the expense.
    *   Add an optional description for the expense.
*   **Expense Summary & Visualization:**
    *   View total expenses.
    *   Interactive pie chart displaying expense distribution.
    *   Group expenses by category or date (displayed in dd/mm/yyyy format).
    *   Convert all expenses to a single display currency with real-time exchange rate calculations.
*   **Data Management:**
    *   Expenses are saved locally using browser `localStorage`.
    *   Warning message if `localStorage` is unavailable.
    *   Delete individual expenses.
    *   Delete all expenses for a selected month and year.
    *   Delete all expenses.
    *   Confirmation prompts for delete operations.
*   **User Interface:**
    *   Clean and professional design.
    *   Responsive navbar with the application title, logo, and navigation links with icons.
    *   Success messages upon adding an expense.
    *   Footer with application credit.

## Technologies Used

*   **React:** For building the user interface.
*   **React Router:** For client-side routing and navigation between pages.
*   **Recharts:** For creating the interactive pie chart in the expense summary.
*   **HTML5 & CSS3:** For structuring and styling the application.
*   **JavaScript (ES6+):** For application logic.
*   **localStorage API:** For persisting expense data in the browser.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm (Node Package Manager) installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation & Running

1.  Clone the repository (if applicable) or navigate to your project directory.
    ```sh
    cd path/to/your/expenseapp
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Run the app in development mode:
    ```sh
    npm start
    ```
    This will open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will automatically reload if you make changes to the code. You will also see any lint errors in the console.

## Project Structure

```
expenseapp/
├── public/             # Static assets and HTML template
├── src/
│   ├── components/     # React components (ExpenseForm.js, ExpenseSummary.js)
│   ├── utils/          # Utility functions (storage.js for localStorage)
│   ├── App.css         # Main application styles
│   ├── App.js          # Main application component with routing
│   ├── index.css       # Global styles
│   ├── index.js        # Entry point of the React application
│   └── ...             # Other React-specific files
├── package.json        # Project dependencies and scripts
├── README.md           # This file
└── mermaid-diagrams.md # UML diagrams for the application
```

ExpenseTracker© made by Team9
