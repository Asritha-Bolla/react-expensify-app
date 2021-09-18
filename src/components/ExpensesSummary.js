import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'

export const ExpensesSummary = ({ totalExpenses, expensesCount, expensesTotal }) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00')
    const hiddenExpensesCount = totalExpenses - expensesCount
    return ( 
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                {
                    hiddenExpensesCount > 0 &&
                    <p>{hiddenExpensesCount} hidden expenses due to your current filters. Please adjust filters to view them</p>
                }
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    )
}

const mapStoreToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        totalExpenses: state.expenses.length,
        expensesCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStoreToProps)(ExpensesSummary)