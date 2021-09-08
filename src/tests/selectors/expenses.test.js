import moment from 'moment'
import selectExpenses from '../../selectors/expenses'
import expenses from '../fixtures/expenses'

test('should filter expenses by given text', () => {
    const filters = {
        text: 'e',
        sortBy: 'date', //recent expense first
        startDate: undefined,
        endDate: undefined
    }
    const filteredExpenses = selectExpenses(expenses, filters)
    expect(filteredExpenses).toEqual([ expenses[2], expenses[1] ]) //rent and coffee have 'e', recent one is coffee
})

test('should filter expenses by start date', () => {
    const filters = {
        text: '',
        sortBy: 'date', //recent expense first
        startDate: moment(0),
        endDate: undefined
    }
    const filteredExpenses = selectExpenses(expenses, filters)
    expect(filteredExpenses).toEqual([ expenses[2], expenses[0] ]) //coffee and gum have createdAt >= startDate
})

test('should filter expenses by end date', () => {
    const filters = {
        text: '',
        sortBy: 'date', //recent expense first
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    }
    const filteredExpenses = selectExpenses(expenses, filters)
    expect(filteredExpenses).toEqual([ expenses[0], expenses[1] ]) //gum and rent have createdAt <= endDate
})

test('should sort expenses by date', () => {
    const filters = {
        text: '',
        sortBy: 'date', //recent expense first
        startDate: undefined,
        endDate: undefined
    }
    const filteredExpenses = selectExpenses(expenses, filters)
    expect(filteredExpenses).toEqual([ expenses[2], expenses[0], expenses[1] ])
})

test('should sort expenses by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount', //greater amount first
        startDate: undefined,
        endDate: undefined
    }
    const filteredExpenses = selectExpenses(expenses, filters)
    expect(filteredExpenses).toEqual([ expenses[1], expenses[2], expenses[0] ])
})