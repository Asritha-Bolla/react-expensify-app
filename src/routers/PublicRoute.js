import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

//On accessing '/' route, if user is logged in, he should be redirected to dashboard page. Show LoginPage component only if he's logged out
export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => ( //stateless functional component  
        isAuthenticated ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />
        )
    )} />
)

const mapStoreToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStoreToProps)(PublicRoute)