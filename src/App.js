import {useState, useCallback} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Navbar from './components/navigation/Navbar'
import Apparel from './pages/apparel/Apparel'
import Collectables from './pages/collectables/Collectables'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Auth from './pages/user/Auth'
import {AuthContext} from './context/AuthContext'

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState(false)

    const login = useCallback(uid => {
        setIsLoggedIn(true)
        setUserId(uid)
    }, [])

    const logout = useCallback(() => {
        setIsLoggedIn(false)
        setUserId(null)
    }, [])

    let routes
    if (isLoggedIn) {
        routes = (
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
                <Route path='/:userId/Profile'>
                    <Profile />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    } else {
        routes = (
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
                <Redirect to='/Auth' />
            </Switch>
        )
    }

    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}}>
           <Navbar />
            {routes}
        </AuthContext.Provider>
    )
}

export default App

// switch: whenever a fitting route is encountered, it will not evaluate the lines after