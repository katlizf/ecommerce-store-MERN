import {Route, Redirect, Switch} from 'react-router-dom'
import Navbar from './components/navigation/Navbar'
import Apparel from './pages/apparel/Apparel'
import Collectables from './pages/collectables/Collectables'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Auth from './pages/user/Auth'
import './_app.scss'

function App() {
    return (
        <div>
           <Navbar />
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
                <Route path='/Auth'>
                    <Auth />
                </Route>
                <Route path='/Profile'>
                    <Profile />
                </Route>
                <Redirect to='/' />
            </Switch> 
        </div>
    )
}

export default App

// switch: whenever a fitting route is encountered, it will not evaluate the lines after