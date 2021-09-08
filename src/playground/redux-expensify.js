import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

//each action dispatches to ALL reducers. we just have to setup cases to handle that action in required reducers only

//Action generators

const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

const removeExpense = ({ id } = {}) => ({ //id is mandatory, so no default
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const setStartDate = (startDate) => ({ //if argument is not passed, it's value is undefined. We anyways need undefined as default value for startDate (YAY!!)
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

//Expenses Reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense) //don't use push since it modifies the current state array. concat returns a new array (YAY!!), or use ES6 spread operator to create new array based on previous array
            return [...state, action.expense] //new array with new expense added as the last element
        case 'REMOVE_EXPENSE':
            //return state.filter((expense) => expense.id !== action.id)
            return state.filter(({ id }) => id !== action.id) //using destructuring
        case 'EDIT_EXPENSE': 
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return { //new object
                        ...expense,
                        ...action.updates //overrides the values provided by expense if common properties are present. See user example below
                    }
                }
                else {
                    return expense
                }
            })
        default:
            return state;
    }
}

//Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

// array spread can be used everywhere
 //*************object spread is working here because of babel plugin, otherwise gives an error*************************************** */
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text //override text value
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}


const getVisibleExpenses = (expenses , { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        //if startDate=undefined, all expenses are included
        //if startDate is a number (milliseconds), then expense createdAt is checked. Only expenses created after startDate are included
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate 
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    
        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === 'date') {
            //if you return 1, b comes first. if you return 1, a comes first
            return a.createdAt < b.createdAt ? 1 : -1 //show the recent expense first
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer, //root state name: it's reducer
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

//store.dispatch returns the action object

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -11000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

//store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

//store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())

//store.dispatch(setEndDate(1000))

//initial state data, can be changed later
//complex state! can't be easily managed by one reducer. So, we use separate reducers to manage each state property and then combine them to form the whole state
const demoState = {
    expenses: [{
        id: 'dsfjhfkjh',
        description: 'January Rent',
        note: 'This was the final payment for this address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'text',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
}

// const user = {
//     name: 'Ashu',
//     age: 24
// }

// console.log({
//     ...user,
//     location: 'Hyderabad',
//     age: 27 //overrides the age value from user
// })

// console.log({
//     age: 27,
//     ...user, //age value is not overridden
//     location: 'Hyderabad'
// })