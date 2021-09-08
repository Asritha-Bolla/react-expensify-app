import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'

//define routes inside JSX
//exact=true does a strict route match and not just 'contains'. i.e., / is present in both '/' and '/create'. So on '/' route, browser...
//...renders both components. But if we use exact=true, '/' strictly matches '/' only and renders that component only
//When React-Router sees Switch, it checks the routes one by one and STOPS if it finds a match. All routes below it will not be checked
//A Route without a 'path' is ALWAYS a match
//Route or <a> tag causes full page refresh since it goes via server side routing
//Link/NavLink uses client side routing => instead of full page refresh, it only swaps content by react re-rendering =>FAST!! DOM is not greatly modified YAY!!
//NavLink similar to Link but has better features suited to navigation since it can be custom styled based on active class
//Route passes some default props to the component. You can grab query string or url parameters via these props
const AppRouter = () => (
    <BrowserRouter>
    <div>
        <Header />
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit/:id" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route component={NotFoundPage} />
        </Switch>
    </div>
    </BrowserRouter>
);

export default AppRouter