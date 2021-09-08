import React from 'react'
import { Link } from 'react-router-dom'

//exporting unconnected component for testing via jest
export const ExpenseListItem = ({ id, description, amount, createdAt }) => ( //destructuting props object
    <div>
        <Link to={`/edit/${id}`}>{description}</Link>
        <p>{amount} - {createdAt}</p>
    </div>
)

//export default connect()(ExpenseListItem) //we are not grabbing anything from store, we'll still have access to dispatch() via props
export default ExpenseListItem