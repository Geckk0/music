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
            <img src="\src\images\jespersljudio.png" alt="Sample Name" />
            <section>
                <button onClick={loadSong}>Play <br/> Random <br/> Song</button>
            </section>
        </div>
    </>
}

export default Home