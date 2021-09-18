import React, { useState, useContext, useEffect } from "react"
import { Context } from '../App'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function PlaySong(data){
    const [context, updateContext] = useContext(Context)
    const [songId, setSongId] = useState()
    const [playlistId, setPlaylistId] = useState([])

    var parseData
    var song = data.song
    var artist = data.artist
    var playlist = data.playlist
    var isPlaylist = data.isPlaylist

    useEffect(async ()=>{
        if(!isPlaylist){
            await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + song.name)
            .then(async res => {
                parseData = await res.json()
            })
            findSong(parseData)
        }
        else if(isPlaylist){
            setPlaylistId(playlist)
        }
    })

    function findSong(val) {
        if(!isPlaylist){
            val.content.map(content => {
                if(content.artist.name == artist && !songId && content.name == song.name){
                    setSongId(content.videoId)
                }
            })
        }
    }

    function firstPlay(val){
        updateContext({
            isLoaded: true,
            isPlaying: true,
            isPlayingId: val,
            videoLength: window.player.getDuration()
        })
        window.player.loadPlaylist(val)
        window.player.playVideo()
        window.player.setLoop(context.loopPlaylist)
    }
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

    return <>
        <div id="player">
            {isPlaylist ? 
                context.isLoaded && context.isPlayingId === playlistId ? 
                <>
                    {context.isPlaying ? 
                        <button onClick={pause}><FontAwesomeIcon icon={faPause}/></button> 
                        : 
                        <button onClick={play}><FontAwesomeIcon icon={faPlay}/></button>
                    }
                </> 
                : 
                <button onClick={() => firstPlay(playlistId)}><FontAwesomeIcon icon={faPlay}/></button>
            : 
                context.isLoaded && context.isPlayingId == songId ? 
                <>
                    {context.isPlaying ? 
                        <button onClick={pause}><FontAwesomeIcon icon={faPause}/></button> 
                        : 
                        <button onClick={play}><FontAwesomeIcon icon={faPlay}/></button>
                    }
                </> 
                : 
                <button onClick={() => firstPlay(songId)}><FontAwesomeIcon icon={faPlay}/></button>
            }
        </div>
    </>
}

export default PlaySong