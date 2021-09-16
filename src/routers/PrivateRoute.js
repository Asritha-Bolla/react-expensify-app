import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

//storing remaining properties which are not destructured (path, exact etc.,) in variable called 'rest' (Rest operator)
//making sure we only render component if the user is authenticated
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => ( //stateless functional component  
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
)

const mapStoreToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStoreToProps)(PrivateRoute)