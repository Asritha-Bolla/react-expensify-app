import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'
import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should render ExpensesSummary correctly with 1 expense', () => {
    const expensesTotal = selectExpensesTotal([expenses[0]])
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={expensesTotal} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary correctly with multiple expenses', () => {
    const expensesTotal = selectExpensesTotal(expenses)
    const wrapper = shallow(<ExpensesSummary expensesCount={expenses.length} expensesTotal={expensesTotal} />)
    expect(wrapper).toMatchSnapshot()
})