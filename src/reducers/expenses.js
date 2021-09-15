//Expenses Reducer

const expensesReducerDefaultState = []

export default (state = expensesReducerDefaultState, action) => {
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
        case 'SET_EXPENSES':
            return action.expenses
        default:
            return state;
    }
}