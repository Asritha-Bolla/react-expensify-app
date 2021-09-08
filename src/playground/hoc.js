// Higher Order Component (HOC) ->  A React component (HOC) which renders other components (normal React components)

import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => ( //normal react component
    <div>
        <h1>Info</h1>
        <p>Info: {props.info}</p>
    </div>
)

//{...props} => spreading each of the props key:value and passing them to the component. NOTE: here {} is NOT object. It's jsx brackets to wrap javascript expression
const withAdminWarning = (WrappedComponent) => { //function which returns the HOC which wraps the component we passed
    return (props) => ( //HOC (here we are using stateless react component)
        <div>
            {props.isAdmin && <p>This is private data! Please do not share!</p>}
            <WrappedComponent {...props} /> 
        </div>
    )
}

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please login to see the details</p>}
        </div>
    )
}

const AdminInfo = withAdminWarning(Info) //AdminInfo = HOC. One HOC can wrap and render multiple components => HOC adds reusability.
//example in above case admin message can be shown for multiple components using HOC
//Google other benefits of HOC
const AuthInfo = requireAuthentication(Info) //AuthInfo = HOC

//ReactDOM.render(<AdminInfo isAdmin={true} info="These are some details" />, document.getElementById('myapp'))
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is some info" />, document.getElementById('myapp'))