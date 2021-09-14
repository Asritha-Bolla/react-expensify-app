import React from 'react'
import { shallow } from 'enzyme'
import { AddExpensePage } from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

let startAddExpense, history, wrapper

beforeEach(() => {
    startAddExpense = jest.fn() //spy 1
    history = { push: jest.fn() /*spy 2*/ }
    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />)
})

test('should render AddExpensePage correctly', () => {
    // const startAddExpense = jest.fn() //spy 1
    // const history = { push: jest.fn() /*spy 2*/ }
    // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />)
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    // const startAddExpense = jest.fn() //spy 1
    // const history = { push: jest.fn() /*spy 2*/ }
    // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />)
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith('/') //spy 2
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1])
})