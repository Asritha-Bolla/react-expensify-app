import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer, //root state name: it's reducer
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk)) //using thunk middleware (asynchronous) we can apply middleware to dispatch method of redux
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //not needed after adding line 6
    )

    return store
}