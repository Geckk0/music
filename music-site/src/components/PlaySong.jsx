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

    //Get song on load
    useEffect(async ()=>{
        if(!isPlaylist){
            await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + song.name)
            .then(async res => {
                parseData = await res.json()
            })
            findSong(parseData)
        }
        else if(isPlaylist){
            updateContext({
                playlist: playlist
            })
            setPlaylistId(playlist)
        }
    }, [])

    function findSong(val) {
        if(!isPlaylist){
            val.content.map(content => {
                if(content.artist.name == artist && !songId && content.name == song.name){
                    setSongId(content.videoId)
                }
            })
        }
    }

    function load(val){
        updateContext({
            playedSong: song,
            isLoaded: true,
            isPlaying: true,
            isPlayingId: val,
            videoLength: player.getDuration()
        })
        if(Array.isArray(val)){
            player.loadPlaylist(val.map(obj => obj.videoId))
        }
        else{
            player.loadPlaylist(val)
        }
        player.playVideo()
        player.setLoop(context.loopPlaylist)
    }
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

    return <>
        <div id="player">
            {isPlaylist ? 
                context.isLoaded && context.isPlayingId == playlistId ? 
                <>
                    {context.isPlaying ? 
                        <button onClick={pause}><FontAwesomeIcon icon={faPause}/></button> 
                        : 
                        <button onClick={play}><FontAwesomeIcon icon={faPlay}/></button>
                    }
                </> 
                : 
                <button onClick={() => load(playlistId)}><FontAwesomeIcon icon={faPlay}/></button>
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
                <button onClick={() => load(songId)}><FontAwesomeIcon icon={faPlay}/></button>
            }
        </div>
    </>
}

export default PlaySong