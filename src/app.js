import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'

import 'normalize.css/normalize.css' //normalize.css file in normalize.css module. This gives common style base across browsers/OS, so that styles built on top of that base looks same in all devices/browsers
import './styles/styles.scss' //webpack sees this and converts css to js using loaders we installed. Not good performance-wise
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

// store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }))
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }))
// store.dispatch(addExpense({ description: 'Rent', amount: 10500 }))

/* store.dispatch(setTextFilter('water'))

setTimeout(() => {
    store.dispatch(setTextFilter('bill'))
}, 3000) */

const state = store.getState()

// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)

// console.log(visibleExpenses)

//Provider provides the store to all of our components, so that the component can use 'connect' to connect with the store 
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('myapp'))