import {Route, Redirect, Switch} from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'

function App() {
    return (
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}

export default App

// switch: whenever a fitting route is encountered, it will not evaluate the lines after