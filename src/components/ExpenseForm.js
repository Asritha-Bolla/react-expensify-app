import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
//import 'react-dates/lib/css/_datepicker.css' --> moving this to app.js

//instead of manipulating the store too many times for each change to form fields, we only hit the store when form gets submitted
//so we'll use the component state to manage the changes before form submit
//without onChange, using props/state data as 'value' makes the field read-only
export default class ExpenseForm extends React.Component {
    constructor (props) {
        super(props)

        //props.expense exists only for existing expense i.e, when ExpenseForm is rendered from EditExpensePage
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }

    //using babel class properties feature
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() => ({ description }))
    }

    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(() => ({ note }))
    }

    onAmountChange = (e) => {
        const amount = e.target.value
        //amount should start with number, allow decimal (optional), allow only 2 places after decimal and ends there
        if (amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    }

    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt }))
        }
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    }

    onSubmit = (e) => {
        e.preventDefault()

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please enter description and amount!' }))
        } else {
            this.setState(() => ({ error: '' }))
            this.props.onSubmit({ //we are sending back data instead of directly dispatching here because we want to reuse ExpenseForm to dispatch different actions for AddExpensePage and EditExpensePage
                description: this.state.description,
                amount: parseFloat(this.state.amount , 10) * 100, //string to float and to cents
                createdAt: this.state.createdAt.valueOf(), //moment.valueOf -> unix timestamp in milliseconds
                note: this.state.note
            })
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input type="text" className="text-input" placeholder="Description" autoFocus value={this.state.description} onChange={this.onDescriptionChange} />
                <input type="text" className="text-input" placeholder="Amount" value={this.state.amount} onChange={this.onAmountChange} />
                <SingleDatePicker 
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea className="textarea" placeholder="Add a note for your expense (optional)" value={this.state.note} onChange={this.onNoteChange}></textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    }
}