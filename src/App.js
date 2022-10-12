import {Route, Redirect, Switch} from 'react-router-dom'
import './App.css'
import Apparel from './pages/apparel/Apparel'
import Collectables from './pages/collectables/Collectables'
import Home from './pages/home/Home'

function App() {
    return (
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>
            <Route path='/Apparel'>
                <Apparel />
            </Route>
            <Route path='/Collectables'>
                <Collectables />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}

export default App

// switch: whenever a fitting route is encountered, it will not evaluate the lines after