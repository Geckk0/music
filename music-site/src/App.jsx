import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Home from './components/Home.jsx'
import Search from './components/Search.jsx'

function App() {

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">H</Link>
          <Link to="/search">S</Link>
        </nav>
        <Switch>
          <Route path="/search">
            <Search/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
    
}

export default App
