import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

//exporting unconnected component just for testing it in jest test files
export const ExpenseList = (props) => ( //stateless function component. This doesn't have to worry about managing the state because redux does it for it
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />
                })
            )
        }
    </div>
)

//connect(mapStateToProps) returns a function to which we pass our component to be wrapped, and this function returns the HOC refer hoc.js)
//connect gets the state data from the store
//using mapStateToProps function,  we can pass the state data (given to us by connect) and can pass them as props to the wrapped component
//The HOC returned is thus connecting our React component with the redux store (YAYY!!)

const mapStateToProps = (state) => { //optional if you don't need the data from store
    console.log(state.expenses)
    return {
        expenses: selectExpenses(state.expenses, state.filters) //we want to show only the filtered expenses
    }
}

//const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList)
//export default ConnectedExpenseList

export default connect(mapStateToProps)(ExpenseList) //As the store data changes, the connected component re-renders with new state data (AWESOME!!)