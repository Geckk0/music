import React, { useContext, useState, useEffect } from "react"
import { Context } from '../App'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPause, faSyncAlt, faPlay, faVolumeDown, faVolumeUp, faAngleDoubleRight, faAngleDoubleLeft, faRandom } from "@fortawesome/free-solid-svg-icons"

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
        player.playVideo()
    }

    function pause(){
        updateContext({
            isPlaying: false
        })
        player.pauseVideo()
    }

    function loop(){ 
        updateContext({
            loopPlaylist: !context.loopPlaylist
        })
        player.setLoop(!context.loopPlaylist)
    }
    
    function shuffle(){ 
        updateContext({
            shufflePlaylist: !context.shufflePlaylist
        })
        player.setShuffle(!context.shufflePlaylist)
    }

    function jumpNext(){ 
        player.nextVideo()
    }

    function jumpPrev(){ 
        player.previousVideo()
    }

    function changeVolume(val){
        updateContext({
            volume: val
        })
        player.setVolume(context.volume)
    }
    
    //Loop counter on load
    useEffect(() => {
        let intervalId;
        
        //Counter only active when song playing
        if (context.isPlaying) {
            intervalId = setInterval(() => {
            
                const totSecondCounter = Math.floor(player.getDuration() % 60)
                const totMinuteCounter = Math.floor(player.getDuration() / 60)

                const totComputedSecond = String(totSecondCounter).length === 1 ? `0${totSecondCounter}`: totSecondCounter
                const totComputedMinute = String(totMinuteCounter)
                
                setTotalSeconds(totComputedSecond)
                setTotalMinutes(totComputedMinute)
                
                const secondCounter = Math.floor(player.getCurrentTime() % 60)
                const minuteCounter = Math.floor(player.getCurrentTime() / 60)

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter
                const computedMinute = String(minuteCounter)
                
                setPlayedSeconds(computedSecond)
                setPlayedMinutes(computedMinute)

                setVideoTime(player.getCurrentTime())

                if(context.loopPlaylist == false && player.getPlayerState() == 0){
                    pause()
                }

            }, 1000)
        }
    
        return () => clearInterval(intervalId);
    }, [context.isPlaying, context.loopPlaylist, context.isPlayingId])

    //Move to time in song when moving progress bar
    function updateTime(val){
        player.seekTo(val, true)
        setVideoTime(val)
    }

    return <>
        <section id="play-bar">
            <div>  
                <input className="played-slider" type="range" min="0" max={player.getDuration()} value={videoTime} onChange={(e) => updateTime(e.target.value)}/>
            </div>
            <div>

                <div>
                    {context.shufflePlaylist ? 
                        <button className="inactive" onClick={shuffle}><FontAwesomeIcon icon={faRandom}/></button> 
                        : 
                        <button className="active" onClick={shuffle}><FontAwesomeIcon icon={faRandom}/></button>
                    }
                    {context.loopPlaylist ? 
                        <button className="inactive" onClick={loop}><FontAwesomeIcon icon={faSyncAlt}/></button> 
                        : 
                        <button className="active" onClick={loop}><FontAwesomeIcon icon={faSyncAlt}/></button>
                    }
                </div>
                
                
                <div>
                    <button className="active" onClick={jumpPrev}><FontAwesomeIcon icon={faAngleDoubleLeft}/></button>

                    {context.isPlaying ? 
                        <button className="active" onClick={pause}><FontAwesomeIcon icon={faPause}/></button> 
                        : 
                        <button className="active" onClick={play}><FontAwesomeIcon icon={faPlay}/></button>
                    }
                    <p>{playedMinutes}:{playedSeconds} / {totalMinutes}:{totalSeconds}</p>

                    <button className="active" onClick={jumpNext}><FontAwesomeIcon icon={faAngleDoubleRight}/></button>
                </div>
                
                <div className="volume">
                    <FontAwesomeIcon icon={faVolumeDown}/>
                    <input className="volume-slider" type="range" min="0" max="50" value={context.volume} onChange={(e) => {changeVolume(e.target.value)}} onClick={(e) => {changeVolume(e.target.value)}} />
                    <FontAwesomeIcon icon={faVolumeUp}/>
                </div>
                
            </div>
        </section> 
    </>
}

export default PlayBar