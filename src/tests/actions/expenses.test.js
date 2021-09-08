import { addExpense, editExpense, removeExpense } from '../../actions/expenses'

test('should setup action to remove an existing expense', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({ //toBe(i.e., ===) doesn't work with array and object comparison {} === {} -> false, [] === [] -> false
        //toEqual iterates over obj properties and compares (for arrays iterates over each item and compares)
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup action to edit an existing expense', () => {
    const action = editExpense('abc123', { note: 'New note value' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: { note: 'New note value' }
    })
})

test('should setup action to add an expense with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'Last month rent'
    }

    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData, 
            id: expect.any(String) //since we don't know dynamic id value, we just check the type using expect.any
        }
    })
})

test('should setup action to add an expense with default values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    })
})