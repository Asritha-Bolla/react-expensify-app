import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('should setup default filter values', () => {
    const action = { type: '@@INIT' } //@@INIT is default action dispatched by Redux internally on initial load
    const state = filtersReducer(undefined, action) //current state not needed to setup defaults, so passing undefined
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
})

test('should set sortBy to date', () => {
    const action = { type: 'SORT_BY_DATE' }
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const state = filtersReducer(currentState, action) 
    expect(state.sortBy).toBe('date')
})

test('should set sortBy to amount', () => {
    const action = { type: 'SORT_BY_AMOUNT' }
    const state = filtersReducer(undefined, action) //default sortBy is date, so passing current state as undefined
    expect(state.sortBy).toBe('amount')
})

test('should set text filter value', () => {
    const action = { type: 'SET_TEXT_FILTER', text: 'rent' }
    const state = filtersReducer(undefined, action)
    expect(state.text).toBe('rent')
})

test('should set startDate filter value', () => {
    const startDate = moment()
    const action = { type: 'SET_START_DATE', startDate }
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toEqual(startDate) //comparing moment objects so toEqusl
})

test('should set endDate filter value', () => {
    const endDate = moment()
    const action = { type: 'SET_END_DATE', endDate }
    const state = filtersReducer(undefined, action)
    expect(state.endDate).toEqual(endDate)
})