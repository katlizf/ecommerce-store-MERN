import {Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'

function App() {
    return (
        <div >
            <Route path='/' exact>
                <Home />
            </Route>
        </div>
    )
}

export default App
