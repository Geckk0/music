import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faSyncAlt, faPlay } from "@fortawesome/free-solid-svg-icons";

function Home(){
    const [playing, setPlaying] = useState(false)

    function loadSong() {
        setPlaying(true)
        window.player.loadVideoById("dQw4w9WgXcQ")
    }

    function play(){
        setPlaying(true)
        window.player.playVideo()
    }

    function pause(){
        setPlaying(false)
        window.player.pauseVideo()
    }

    function loop(){
        window.player.setLoop(true)
    }

    return <>
        <div id="home-page">
                <h1>Home</h1>
            <section>
                <button onClick={loadSong}>Play <br/> Random <br/> Song</button>
            </section>
            <div>
                {playing ? <button onClick={pause}><FontAwesomeIcon icon={faPause}/></button> : <button onClick={play}><FontAwesomeIcon icon={faPlay}/></button>}
                <button onClick={loop}><FontAwesomeIcon icon={faSyncAlt}/></button>
            </div>
        </div>
    </>
}

export default Home