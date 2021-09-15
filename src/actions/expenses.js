import uuid from 'uuid'
import database from '../firebase/firebase'

//Expenses Action generators

//component calls action generator
//action generator returns object
//component dispatches object
//redux store changes

// export const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createdAt
//     }
// })

// export const removeExpense = ({ id } = {}) => ({ //id is mandatory, so no default
//     type: 'REMOVE_EXPENSE',
//     id
// })

// export const editExpense = (id, updates) => ({
//     type: 'EDIT_EXPENSE',
//     id,
//     updates
// })

//component calls action generator
//action generator returns function
//component dispatches function (not supported by redux by default, so we can add asynchronous middleware to dispatch via redux-thunk)
//function runs -> dispatches action object AND runs any extra code we want (this extra code is where we write our calls to firebase)

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
})

//Asynchronous redux action
export const startAddExpense = (expenseData = {}) => { //this function is dispatched by AddExpensePage component. This ONLY works because of 'redux-thunk' middleware
    return (dispatch) => { //dispatch is provided internally by redux
        const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData
        const expense = { description, note, amount, createdAt } //id is generated by firebase
    
        //push the new expense to firebase database
        //returning this so that we can chain on to this promise in other file. (see expenses.test.js)
        return database.ref('expenses').push(expense).then((ref) => { //ASYNCHRONOUS!!!!!!!
            //update redux store with new expense data
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((snapshot) => {
            const expenses = []
            snapshot.forEach(childSnapshot => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                }) 
            });
            dispatch(setExpenses(expenses))
        })
    }
}


export const removeExpense = ({ id } = {}) => ({ //id is mandatory, so no default
    type: 'REMOVE_EXPENSE',
    id
})

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }))
        })
    }
}

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates))
        })
    }
}