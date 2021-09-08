import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot() //taking snapshot before form submission to capture form w/o error
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {} //to mock e.preventDefault() by doing nothing
    })
    expect(wrapper.state('error').length).toBeGreaterThan(0) //checking component state
    expect(wrapper).toMatchSnapshot() //taking snapshot after error is rendered
})

test('should set description on input change', () => {
    const value = 'New Description!'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(0).simulate('change', { //first input's onChange
        target: { value } //to set e.target.value = 'New Description!'
    })
    expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
    const value = 'New Note!'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('textarea').simulate('change', { //textarea's onChange
        target: { value } //to set e.target.value = 'New Note!'
    })
    expect(wrapper.state('note')).toBe(value)
})

test('should set amount on valid input change', () => {
    const value = '500.90'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', { //second input's onChange
        target : { value }
    })
    expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount on invalid input', () => {
    const value = '500.9034'
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('input').at(1).simulate('change', { //second input's onChange
        target : { value }
    })
    expect(wrapper.state('amount')).not.toBe(value)
    //expect(wrapper.state('amount')).not.toBe('') //also correct
})

test('should call onSubmit prop by passing correct data', () => {
    const onSubmitSpy = jest.fn() //spy --> mock function
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    })
})

test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toBe(now)
})

test('should set new focus value on focus change', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused: true })
    expect(wrapper.state('calendarFocused')).toBe(true)
})