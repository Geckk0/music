import React, { useContext, useState, useEffect } from "react"
import { Context } from '../App'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPause, faSyncAlt, faPlay, faVolumeDown, faVolumeUp } from "@fortawesome/free-solid-svg-icons"

function PlayBar(){
    const [context, updateContext] = useContext(Context)
    const [videoTime, setVideoTime] = useState('00')
    const [playedSeconds, setPlayedSeconds] = useState(0)
    const [playedMinutes, setPlayedMinutes] = useState(0)
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [totalMinutes, setTotalMinutes] = useState(0)
    
    
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
        updateContext({
            loopPlaylist: !context.loopPlaylist
        })
        window.player.setLoop(!context.loopPlaylist)
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
            
            const totSecondCounter = Math.floor(window.player.getDuration() % 60)
            const totMinuteCounter = Math.floor(window.player.getDuration() / 60)

            const totComputedSecond = String(totSecondCounter).length === 1 ? `0${totSecondCounter}`: totSecondCounter
            const totComputedMinute = String(totMinuteCounter)
            
            setTotalSeconds(totComputedSecond)
            setTotalMinutes(totComputedMinute)
            
            const secondCounter = Math.floor(window.player.getCurrentTime() % 60)
            const minuteCounter = Math.floor(window.player.getCurrentTime() / 60)

            const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter
            const computedMinute = String(minuteCounter)
            
            setPlayedSeconds(computedSecond)
            setPlayedMinutes(computedMinute)

            setVideoTime(window.player.getCurrentTime())

            if(window.player.getCurrentTime() == window.player.getDuration() && context.loopPlaylist == false && context.isPlayingId.length < 2){
                pause()
            }

          }, 1000)
        }
    
        return () => clearInterval(intervalId);
    }, [context.isPlaying, context.loopPlaylist, context.isPlayingId])

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
                
                <div>
                    {context.isPlaying ? 
                    <button className="active" onClick={pause}><FontAwesomeIcon icon={faPause}/></button> : 
                    <button className="active" onClick={play}><FontAwesomeIcon icon={faPlay}/></button>}
                    <p>{playedMinutes}:{playedSeconds} / {totalMinutes}:{totalSeconds}</p>
                </div>
                
                <div>
                    <FontAwesomeIcon icon={faVolumeDown}/>
                    <input className="volume-slider" type="range" min="0" max="50" value={context.volume} onChange={(e) => {changeVolume(e.target.value)}} onClick={(e) => {changeVolume(e.target.value)}} />
                    <FontAwesomeIcon icon={faVolumeUp}/>
                </div>
                
            </div>
        </section> 
    </>
}

export default PlayBar