import React, { createContext, useState } from 'react'
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
import ShowSong from './components/ShowSong.jsx'
import PlayBar from './components/PlayBar.jsx'

export const Context = createContext()

function App() {

  const [contextVal, setContext] = useState({
    isLoaded: false,
    isPlaying: false,
    isPlayingId: '',
    volume: 10,
    loopPlaylist: false,
    shufflePlaylist: false
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
            <a className="empty-space"/>
            <Link to="/search/search"><FontAwesomeIcon icon={faSearch}/></Link>
          </nav>
          <div>
            
          <Switch>
            <Route path="/showartist/:id">
              <ShowArtist/>
            </Route>
            <Route path="/showsong/:name/:artist">
              <ShowSong/>
            </Route>
            <Route path="/search/:term/:value">
              <Search/>
            </Route>
            <Route path="/search/:term">
              <Search/>
            </Route>
            <Route path="/search/">
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
