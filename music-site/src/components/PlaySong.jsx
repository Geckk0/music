import React, { useState,useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function PlaySong(data){
    
    const [playing, setPlaying] = useState(false)
    const [loaded, setLoaded] = useState(false)

    var parseData, songId
    var song = data.song
    var artist = data.artist

    useEffect(async ()=>{
        await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + song.name)
        .then(async res => {
            parseData = await res.json()
        })
        findSong(parseData)
    })

    function findSong(val) {
        val.content.map(song => {
            if(song.artist.name == artist && !songId){
                songId = song.videoId
                console.log(song.name)
            }
        })
    }

    function firstPlay(val){
        window.player.loadVideoById(val)
        setLoaded(true)
        setPlaying(true)
        window.player.playVideo()
    }
    function play(){
        setPlaying(true)
        window.player.playVideo()
    }

    function pause(){
        setPlaying(false)
        window.player.pauseVideo()
    }

    return <>
            {loaded ? 
            <>
                {playing ? <button onClick={pause}><FontAwesomeIcon icon={faPause}/></button> : <button onClick={play}><FontAwesomeIcon icon={faPlay}/></button>}
            </> : <button onClick={() => firstPlay(songId)}><FontAwesomeIcon icon={faPlay}/></button>}

            <div>
                <h3>{song.name}</h3>
                <p>{song.album.name}</p>
            </div>

    </>
}

export default PlaySong