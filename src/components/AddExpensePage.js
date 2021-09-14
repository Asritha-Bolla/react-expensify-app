import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startAddExpense } from '../actions/expenses'

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        //this.props.dispatch(addExpense(expense)) -->harder to test since only dispatch can be spied but not addExpense
        this.props.startAddExpense(expense) //dispatch call is abstracted so only single function here => easy to spy
        this.props.history.push('/') //browser routing => content is replaced without full page refresh. history prop is provided by 'Route'
    }
    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    // addExpense: (expense) => dispatch(addExpense(expense)) //dispatching action object
    startAddExpense: (expense) => dispatch(startAddExpense(expense)) //dispatching a function is ONLY possible because of redux-thunk middleware
})
    

export default connect(undefined, mapDispatchToProps)(AddExpensePage) //mapStateToProps is not needed here, so passing undefined