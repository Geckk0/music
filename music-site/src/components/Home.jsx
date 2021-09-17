import React, { useState, useContext } from "react"
import { Context } from '../App'

function Home(){
    const [context, updateContext] = useContext(Context)

    function loadSong() {
        updateContext({
            isLoaded: true,
            isPlaying: true,
            isPlayingId: "dQw4w9WgXcQ"
        })
        window.player.loadPlaylist("dQw4w9WgXcQ")
    }

    return <>
        <div id="home-page">
            <div><h1>Sample <p>Name</p></h1></div>
            <section>
                <button onClick={loadSong}>Play <br/> Random <br/> Song</button>
            </section>
        </div>
    </>
}

export default Home