import React, { useContext, useState, useEffect } from "react"
import { Context } from '../App'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPause, faSyncAlt, faPlay } from "@fortawesome/free-solid-svg-icons"

function PlayBar(){
    const [context, updateContext] = useContext(Context)
    const [videoTime, setVideoTime] = useState('00');
    
    
    function play(){
        updateContext({
            isPlaying: true
        })
        window.player.playVideo()
    }

    function pause(){
        updateContext({
            isPlaying: false
        })
        window.player.pauseVideo()
    }

    function loop(){
        window.player.setLoop(!context.loopPlaylist)
        updateContext({
            loopPlaylist: !context.loopPlaylist
        })
    }

    function changeVolume(val){
        updateContext({
            volume: val
        })
        window.player.setVolume(context.volume)
    }
    
    useEffect(() => {
        let intervalId;
    
        if (context.isPlaying) {
          intervalId = setInterval(() => {

            setVideoTime(window.player.getCurrentTime())
          }, 500)
        }
    
        return () => clearInterval(intervalId);
    }, [context.isPlaying])

    function updateTime(val){
        window.player.seekTo(val, true)
        setVideoTime(val)
    }

    return <>
        <section id="play-bar">
            <div>  
                <input className="played-slider" type="range" min="0" max={window.player.getDuration()} value={videoTime} onChange={(e) => updateTime(e.target.value)}/>
            </div>
            <div>
                {context.loopPlaylist ? 
                <button className="inactive" onClick={loop}><FontAwesomeIcon icon={faSyncAlt}/></button> : 
                <button className="active" onClick={loop}><FontAwesomeIcon icon={faSyncAlt}/></button>}
                
                {context.isPlaying ? 
                <button className="active" onClick={pause}><FontAwesomeIcon icon={faPause}/></button> : 
                <button className="active" onClick={play}><FontAwesomeIcon icon={faPlay}/></button>}

                <input className="volume-slider" type="range" min="0" max="10" value={context.volume} onChange={(e) => {changeVolume(e.target.value)}} />
            </div>
        </section> 
    </>
}

export default PlayBar