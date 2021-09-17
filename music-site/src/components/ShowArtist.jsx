import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import PlaySong from "./PlaySong"

function ShowArtist() {

    const [artist, setArtist] = useState([])
    const [artistSongs, setArtistSongs] = useState([])
    const [artistAlbums, setArtistAlbums] = useState([])
    const [thumbnail816, setThumbnail816] = useState()

    var { id } = useParams()
    var data
    var number = 0

    useEffect(async ()=>{
        await fetch('https://yt-music-api.herokuapp.com/api/yt/artist/' + id)
        .then(async res => {
            data = await res.json()
            if(data.products)setArtistAlbums(data.products.albums.content)
            if(data.products)setArtistSongs(data.products.songs.content)
            setArtist(data)
            console.log(data)
        })
        .catch(error => console.log(error))
        getImage(data)
    },[])

    function getImage(artist) {
        if(artist.thumbnails){
            artist.thumbnails.map(thumbnail => {
                if(thumbnail.width == 540){
                    setThumbnail816(<img src={thumbnail.url} alt="" />)
                }
            })
        }
        else setThumbnail816(<img style={{objectFit: "cover"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png" alt="" />)
    }

    return <>
        <div id='artist-page'>
            {thumbnail816}
            <h2>{artist.name ? artist.name : "No Artist Found"}</h2>

            <div className="divider"></div>

            {artistSongs.map(song => (
                <section key={number = number + 1}>
                    <PlaySong song={song} artist={artist.name} artistSongs={artistSongs}/>

                    <div>
                        <h3>{song.name}</h3>
                        <p>{song.album.name}</p>
                    </div>
                </section>
            ))}

            <div className="divider"></div>

            {artistAlbums.map(album => (
                <section key={number = number + 1}>
                </section>
            ))}
                
        </div>
    </>
    
}

export default ShowArtist