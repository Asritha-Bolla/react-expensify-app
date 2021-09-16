import React from 'react'
import ExpenseList from './ExpenseList'
import ExpensesListFilters from './ExpensesListFilters'
import ExpensesSummary from './ExpensesSummary'

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesSummary />
        <ExpensesListFilters />
        <ExpenseList />
    </div>
)

export default ExpenseDashboardPage