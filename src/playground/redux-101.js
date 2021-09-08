import { createStore } from "redux";

//Action generators - functions that return action objects -> easier to change and easier to generate many objects

// const incrementCount = ( payload = {} ) => ({
//     type: 'INCREMENT',
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// })

//If nothing is passed, it is set to empty object. Else, object is destructured and sets incrementBy variable. For obj w/o incrementBy property (ex:empty object), incrementBy is set to 1
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

//count is mandatory! So no defaults and should throw error if count is not passed
const setCount = ({ count }) => ({
    type: 'SET',
    count
})

//Actions - they only identify that something happened, they don't know what should happen to the state  
//Reducers - determines how the state should change when an action happens
//Reducers are pure functions i.e., they don't interact with outside variables etc., their output solely depends on their inputs!!!
//NEVER change state or action in any reducer, since they are passed to all reducers. They should only be read from!
//If you need any MANDATORY change to the state, Return the new state object, but DO NOT change current state

const countReducer = (state = { count: 0 }, action) => { //state = current state, if it doesn't exist, default value will be used
    //return state; //current or default state
    switch (action.type) {
        case 'INCREMENT':
            //const incrementBy = ( typeof action.incrementBy ) === 'number' ? action.incrementBy : 1
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            //const decrementBy = ( typeof action.decrementBy ) === 'number' ? action.decrementBy : 1
            return {
                count: state.count - action.decrementBy
            }
        case 'SET':
            return {
                count: action.count //count is mandatory!
            }
        case 'RESET':
            return {
                count: 0
            }
        default: 
            return state
    }
}


//first argument to createStore is a function which gets called right away and returns the updated state to be used for the store. 
//kinda similar to this.setState which takes a function as argument which executes right away and sets the state
//This argument function ALSO gets called when an action is dispatched (i.e., action object is sent to the store)

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => { //gets called each time a change is made to the store
    console.log(store.getState()) //returns current state
})

//Action = object sent to the store = a way to communicate with the store to make meaningful change to the states
//type is MANDATORY for actions
//apart from type, you can pass as much dynamic information as you want in Action object
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5 //dynamic info
// })

//unsubscribe() //state still changes below, but we just aren't notified

// store.dispatch({
//     type: 'INCREMENT'
// })

store.dispatch(incrementCount({ incrementBy: 5 }))
store.dispatch(incrementCount())

// store.dispatch({
//     type: 'RESET'
// })

store.dispatch(resetCount())

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// })

// store.dispatch({
//     type: 'DECREMENT'
// })

store.dispatch(decrementCount({ decrementBy: 10 }))
store.dispatch(decrementCount())

// store.dispatch({
//     type: 'SET',
//     count: 101
// })

store.dispatch(setCount({ count: 101 }))