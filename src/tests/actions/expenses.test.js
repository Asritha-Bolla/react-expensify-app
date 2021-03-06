import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

//mock store is a replacement for redux store for testing purposes
const createMockStore = configureMockStore([thunk]) //pass array of middlewares to get this function which we'll call later to create a mock store

const uid = 'abc123'
const defaultAuthState = { auth: { uid } }

beforeEach((done) => {
    const expensesData = {} //firebase expects list of data as { uniqueid1: data1, uniqueid2: data2, uniqueid3: data3...  }
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt } // { id1: {desc1, note1, amount1, crea1}, id2: {desc2...}... }
        database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
    })
})

test('should setup action to remove an existing expense', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({ //toBe(i.e., ===) doesn't work with array and object comparison {} === {} -> false, [] === [] -> false
        //toEqual iterates over obj properties and compares (for arrays iterates over each item and compares)
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should remove an existing expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        })
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
        done()
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

test('should edit an existing expense in firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[0].id
    const updates = {
        note: 'Note for Gum'
    }
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })
        
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val().note).toBe(updates.note)
        done()
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
    const store = createMockStore(defaultAuthState) 
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value') //return promise
    }).then((snapshot) => { //success case for above returned promise (See playground/promises.js)
        expect(snapshot.val()).toEqual(expense)
        done()
    })
})

test('should add expense with default values to database and store', (done) => {
    const store = createMockStore(defaultAuthState) 
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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value') //return promise
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

//for adding expenses from firebase database to redux store (on page load when redux store is empty, we can use this to set stored expenses)
test('should setup set expense action object correctly', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses: actions[0].expenses
        })
        done()
    })
})