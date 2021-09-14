import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

//mock store is a replacement for redux store for testing purposes
const createMockStore = configureMockStore([thunk]) //pass array of middlewares to get this function which we'll call later to create a mock store

test('should setup action to remove an existing expense', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({ //toBe(i.e., ===) doesn't work with array and object comparison {} === {} -> false, [] === [] -> false
        //toEqual iterates over obj properties and compares (for arrays iterates over each item and compares)
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup action to edit an existing expense', () => {
    const action = editExpense('abc123', { note: 'New note value' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: { note: 'New note value' }
    })
})

test('should setup action to add an expense with provided values', () => {
    const action = addExpense(expenses[0])
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    })
})

test('should add an expense to database and store', (done) => {
    const store = createMockStore({}) //passing default data which is {}
    const expense = {
        description: 'Mouse',
        amount: 3000,
        note: 'Some note',
        createdAt: 1000
    }

    //asynchronous. jest doesn't wait for this to complete. So use the 'done' callback argument provided by jest. jest will wait till done is called to finish the test case
    store.dispatch(startAddExpense(expense)).then(() => {
        const actions = store.getActions() //returns array of actions that were dispatched to the store. Here we are expecting only one action (ADD_EXPENSE) to have been dispatched
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String), //we don't care about value of id
                ...expense
            }
        })

        return database.ref(`expenses/${actions[0].expense.id}`).once('value') //return promise
    }).then((snapshot) => { //success case for above returned promise (See playground/promises.js)
        expect(snapshot.val()).toEqual(expense)
        done()
    })
})

test('should add expense with default values to database and store', (done) => {
    const store = createMockStore({}) //passing default data which is {}
    const expenseDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    }
    //asynchronous. jest doesn't wait for this to complete. So use the 'done' callback argument provided by jest. jest will wait till done is called to finish the test case
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions() //returns array of actions that were dispatched to the store. Here we are expecting only one action (ADD_EXPENSE) to have been dispatched
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String), //we don't care about value of id
                ...expenseDefaults
            }
        })

        return database.ref(`expenses/${actions[0].expense.id}`).once('value') //return promise
    }).then((snapshot) => { //success case for above returned promise (See playground/promises.js)
        expect(snapshot.val()).toEqual(expenseDefaults)
        done()
    })
})

// test('should setup action to add an expense with default values', () => {
//     const action = addExpense()
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             amount: 0,
//             createdAt: 0,
//             note: ''
//         }
//     })
// })