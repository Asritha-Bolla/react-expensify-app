import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startEditExpense, startRemoveExpense } from '../actions/expenses'
import RemoveModal from './RemoveModal'

export class EditExpensePage extends React.Component {
    //on props, 'location.search' gives querystring, 'match.params' gives the url parameters

    state = {
        openModal: false
    }

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense)
        this.props.history.push('/')
    }
    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id })
        this.props.history.push('/')
    }
    render () {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={() => {
                        this.setState(() => ({ openModal: true }))
                    }}>
                        Remove Expense
                    </button>
                    <RemoveModal openModal={this.state.openModal} closeModal={() => this.setState(() => ({ openModal: false }))} onRemove={this.onRemove} />
                </div>
            </div>
        )
    }
}

const mapStoreToProps = (state, props) => { //props=props which are already being passed to the component ex: match.params above.state= state data from store
    return { //additional new props we want to pass
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStoreToProps, mapDispatchToProps)(EditExpensePage)