import React from 'react'
import ExpenseList from './ExpenseList'
import ExpensesListFilters from './ExpensesListFilters'

const ExpenseDashboardPage = () => (
    <div>
        <p>This is dashboard page</p>
        <ExpensesListFilters />
        <ExpenseList />
    </div>
)

export default ExpenseDashboardPage