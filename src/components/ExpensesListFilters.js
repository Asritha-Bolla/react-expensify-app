import React from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import { setTextFilter } from '../actions/filters'
import { sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters'


//all the connected components have access to dispatch method via props (this dispatch is nothing but our store.dispatch)
export class ExpensesListFilters extends React.Component {
    //using babel transform class properties
    state ={
        calendarFocused : null
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    }

    onTextChange = (e) => { //without onChange, using props/state data as 'value' makes the field read-only
        this.props.setTextFilter(e.target.value) //we are writing to store => connected components re-render with new data
    }

    onSortChange = (e) => { //without onChange, using props/state data as 'value' makes the field read-only
        if (e.target.value === 'date') {
            this.props.sortByDate()
        } else if (e.target.value === 'amount') {
            this.props.sortByAmount()
        }
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input type="text" className="text-input" placeholder="Search Expenses" value={this.props.filters.text} onChange={this.onTextChange} />
                    </div>
                    <div className="input-group__item">
                        <select className="select" value={this.props.filters.sortBy} onChange={this.onSortChange}>
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker 
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                </div>
            </div>
        )
    }
} 

const mapStoreToProps = (state) => ({
    filters: state.filters //reading from store
})

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByAmount: () => dispatch(sortByAmount()),
    sortByDate: () => dispatch(sortByDate())
})

export default connect(mapStoreToProps, mapDispatchToProps)(ExpensesListFilters)