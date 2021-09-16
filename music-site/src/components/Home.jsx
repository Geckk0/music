import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faSyncAlt, faPlay } from "@fortawesome/free-solid-svg-icons";

function Home(){
    const [playPauseButton, setPlayPauseButton] = useState(<button onClick={play}><FontAwesomeIcon icon={faPlay}/></button>)
    const [loopButton, setLoopButton] = useState(<button onClick={loop}><FontAwesomeIcon icon={faSyncAlt}/></button>)

    function loadSong() {
        window.player.loadVideoById("dQw4w9WgXcQ")
        switchButton(true)
    }

    function play(){
        switchButton(true)
        window.player.playVideo()
    }

    function pause(){
        switchButton(false)
        window.player.pauseVideo()

    }

    function loop(){
        window.player.setLoop(true)
    }

    function switchButton(val) {
        if(val == true){
            setPlayPauseButton(<button onClick={pause}><FontAwesomeIcon icon={faPause}/></button>)
        }
        else if(val == false){
            setPlayPauseButton(<button onClick={play}><FontAwesomeIcon icon={faPlay}/></button>)
        }
    }

    return <>
        <div id="home-page">
                <h1>Home</h1>
            <section>
                <button onClick={loadSong}>Play <br/> Random <br/> Song</button>
            </section>
            <div>
                {playPauseButton}
                {loopButton}
            </div>
        </div>
    </>
}

export default Home