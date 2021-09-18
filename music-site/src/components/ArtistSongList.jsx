import { faFileContract } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useEffect } from "react"
import PlaySong from "./PlaySong"

function ArtistSongList(data) {
const [songList, setSongList] = useState([])
const [playlist, setPlaylist] = useState([])

    var thumbnail60, data
    var artist = data.artist
    var number = 0

    useEffect(async ()=>{
        await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + artist)
        .then(async res => {
            data = await res.json()
            setSongList(data.content)
            let temp = []
            data.content.map(song => {
                temp = [...temp, song.videoId]
            })
            setPlaylist(temp)
            
        })
        .catch(error => console.log(error))
    },[])
    
    function getThumbnail(val) {
        val.map(thumbnail => {
        if(thumbnail.width == 60){
            thumbnail60 = <img src={thumbnail.url} alt="" />
        }})
    }

    return <>
        {songList.length ? 
        <div>
            <h2>Songs</h2>
            <PlaySong isPlaylist={true} playlist={playlist} artist={artist}/>
        </div> 
        : <h2>No Songs Found</h2>}
        <article id="show-lists">
            {songList.map(content => (
                <section key={number = number + 1} style={{"--order": number}}>
                    <div>
                        {getThumbnail(content.thumbnails)}{thumbnail60}
                        <div>
                            <PlaySong song={content} artist={content.artist.name}/>
                        </div>
                    </div>
                    
                    <div onClick={() => goToArtist(content.artist.browseId)}>
                        <h3>{content.name}</h3>
                        <p>{content.artist.name}</p>
                    </div>
                </section>
            ))}
        </article>
    </>
}

export default ArtistSongList