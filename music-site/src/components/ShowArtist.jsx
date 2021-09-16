import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function ShowArtist() {

    const [artist, setArtist] = useState([])
    const [artistSongs, setArtistSongs] = useState([])
    const [thumbnail816, setThumbnail816] = useState()

    var { id } = useParams()
    var data

    useEffect(async ()=>{
        await fetch('https://yt-music-api.herokuapp.com/api/yt/artist/' + id)
        .then(async res => {
            data = await res.json()
            console.log(data)
            setArtist(data)
            setArtistSongs(data.products.songs.content)
        })
        .catch(error => console.log(error))
        getImage(data)
    },[])

    function getImage(artist) {
        artist.thumbnails.map(thumbnail => {
            if(thumbnail.width == 540){
                setThumbnail816(<img src={thumbnail.url} alt="" />)
            }
        })
    }

    return <>
        <div id='Artist-page'>
            {thumbnail816}
            <h2>{artist.name}</h2>

            <div className="divider"></div>
        </div>
    </>
    
}

export default ShowArtist