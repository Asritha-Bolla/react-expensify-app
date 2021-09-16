import authReducer from '../../reducers/auth'

test('should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'abc123'
    }
    const state = authReducer({}, action)
    expect(state.uid).toBe(action.uid)
})

test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid: 'anything' }, action) //have some uid on current state, which should be cleared after dispatching logout
    expect(state).toEqual({})
})