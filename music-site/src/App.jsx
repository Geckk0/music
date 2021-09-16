import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

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
          <Link to="/"><FontAwesomeIcon icon={faHome}/></Link>
          <Link to="/search"><FontAwesomeIcon icon={faSearch}/></Link>
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
