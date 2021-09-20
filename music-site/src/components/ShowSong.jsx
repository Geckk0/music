import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import PlaySong from "./PlaySong"
import ShareLinks from "./ShareLinks"

function ShowSong() {

    const [song, setSong] = useState([])
    const [thumbnail120, setThumbnail120] = useState()

    var { name, artist } = useParams()
    var data

    useEffect(async ()=>{
        await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + name)
        .then(async res => {
            data = await res.json()
            data.content.map(content => {
                if(content.artist.name == artist && content.name == name){
                    setSong(content)
                    getThumbnail(content)
                }
            })
        })
        .catch(error => console.log(error))
    },[])

    function getThumbnail(song) {
        song.thumbnails.map(thumbnail => {
            if(thumbnail.width == 120){
                setThumbnail120(<img src={thumbnail.url} alt="" />)
            }
        })
    }

    const history = useHistory()

    function goToArtist(artist) {
        if(artist.length > 1) artist = artist[0]
        history.push('/showartist/' + artist.browseId)
    }

    return <>
        <div id='song-page'>
            {thumbnail120}
            <h2 style={{cursor: "pointer"}} onClick={() => goToArtist(song.artist)}>{artist}</h2>

            <div className="divider"></div>
            <h2>{song.name}</h2>

            <PlaySong song={song} artist={artist}/>
        </div>
    </>
    
}

export default ShowSong