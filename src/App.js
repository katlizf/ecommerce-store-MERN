import {useState, useCallback} from "react"
import {Route, Redirect, Switch} from "react-router-dom"
import {useHistory} from "react-router-dom"
import {AuthContext} from "./context/AuthContext"
import Navbar from "./components/navigation/Navbar"
import Apparel from "./pages/apparel/Apparel"
import Collectables from "./pages/collectables/Collectables"
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile"
import Auth from "./pages/user/Auth"
import UpdateUser from "./components/user/UpdateUser"
import Cart from "./pages/cart/Cart"

function App() {

	const [token, setToken] = useState(false)
	const [userId, setUserId] = useState(false)
	let history = useHistory()

	const login = useCallback((uid, token) => {
		setToken(token)
		setUserId(uid)
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
        history.push("/")
	}, [history])

	let routes
	if (token) {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/Apparel">
					<Apparel />
				</Route>
				<Route path="/Collectables">
					<Collectables />
				</Route>
                <Route path="/:userId/Cart">
                    <Cart />
                </Route>
				<Route path="/:userId/Profile">
					<Profile />
				</Route>
				<Route path="/users/user/:userId">
					<UpdateUser />
				</Route>
				<Redirect to="/" />
			</Switch>
		)
	} else {
		routes = (
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/Apparel">
					<Apparel />
				</Route>
				<Route path="/Collectables">
					<Collectables />
				</Route>
                <Route path="/:userId/Cart">
                    <Cart />
                </Route>
				<Route path="/Auth">
					<Auth />
				</Route>
				<Redirect to="/Auth" />
			</Switch>
		)
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
                token: token,
				userId: userId,
				login: login,
				logout: logout,
			}}
		>
			<Navbar />
			{routes}
		</AuthContext.Provider>
	)
}

export default App

// switch: whenever a fitting route is encountered, it will not evaluate the lines after