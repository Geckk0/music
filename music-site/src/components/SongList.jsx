import React from "react"
import { useHistory } from "react-router-dom"
import PlaySong from "./PlaySong"

function SongList(data) {

    var thumbnail60
    var shortSongList = data.shortSongList
    var number = 0
    
    function getThumbnail(val) {
        val.map(thumbnail => {
        if(thumbnail.width == 60){
            thumbnail60 = <img src={thumbnail.url} alt="" />
        }})
    }

    const history = useHistory()

    function goToArtist(id) {
        history.push('/showartist/' + id)
    }

    return <>
        {shortSongList.length ? <h2>Songs</h2> : <h2>No Songs Found</h2>}
        <article id="show-lists">
            {shortSongList.map(content => (
                <section key={number = number + 1} style={{"--order": number}}>
                    <div>
                        {getThumbnail(content.thumbnails)}{thumbnail60}
                        <div>
                            <PlaySong isPlaylist={false} song={content} artist={content.artist.name}/>
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

export default SongList