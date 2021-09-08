import React from 'react'
import { shallow } from 'enzyme'
import { AddExpensePage } from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

let addExpense, history, wrapper

beforeEach(() => {
    addExpense = jest.fn() //spy 1
    history = { push: jest.fn() /*spy 2*/ }
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />)
})

test('should render AddExpensePage correctly', () => {
    // const addExpense = jest.fn() //spy 1
    // const history = { push: jest.fn() /*spy 2*/ }
    // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />)
    expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
    // const addExpense = jest.fn() //spy 1
    // const history = { push: jest.fn() /*spy 2*/ }
    // const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />)
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
    expect(history.push).toHaveBeenLastCalledWith('/') //spy 2
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1])
})