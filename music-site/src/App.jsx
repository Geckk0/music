import React, {createContext, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Home from './components/Home.jsx'
import Search from './components/Search.jsx'
import ShowArtist from './components/ShowArtist.jsx'
import PlayBar from './components/PlayBar.jsx'

export const Context = createContext()

function App() {

  const [contextVal, setContext] = useState({
    isLoaded: false,
    isPlaying: false,
    isPlayingId: '',
    volume: 10,
    loopPlaylist: false
  })

  function updateContext(updates) {
    setContext({
      ...contextVal,
      ...updates
    })
  }

  return (
    <Context.Provider value={[contextVal, updateContext]}>
      <Router>
        <div>
          <nav>
            <Link to="/"><FontAwesomeIcon icon={faHome}/></Link>
            <Link to="/search"><FontAwesomeIcon icon={faSearch}/></Link>
          </nav>
          <div>
            
          <Switch>
            <Route path="/showartist/:id">
              <ShowArtist/>
            </Route>
            <Route path="/search">
              <Search/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
          {contextVal.isLoaded ? 
            <PlayBar/> : <> </>
          }
          </div>
        </div>
      </Router>
    </Context.Provider>
  )
}

export default App
