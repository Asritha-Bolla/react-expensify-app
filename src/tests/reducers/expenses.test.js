import expenses from '../fixtures/expenses'
import expensesReducer from '../../reducers/expenses'

test('should setup default values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' }) //see filters.test.js in same folder for explanation
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[0], expenses[2] ]) //2nd expense should have been removed
})

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses) //no expense should be removed
})

test('should add expense', () => {
    const expense = { id: '4', description: 'Chocolate', note: '', amount: 300, createdAt: 20000 }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, expense])
})

test('should edit expense based on id', () => {
    const amount = 400
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates: { amount }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[0], expenses[1], {...expenses[2], amount}])
    //expect(state[2].amount).toBe(amount)
})

test('should not edit expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: { amount: 400 }
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})