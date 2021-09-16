import React from "react"
import { useHistory } from "react-router-dom"

function SongList(data) {

    var thumbnail60
    var shortSongList = data.shortSongList
    var fullList = data.fullList
    
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
        <article>
            {shortSongList.map(content => (
                <section key={content.videoId} onClick={() => goToArtist(content.artist.browseId)}>
                    <div>
                        {getThumbnail(content.thumbnails)}{thumbnail60}
                    </div>
                    
                    <div>
                        <h3>{content.name}</h3>
                        <p>{content.artist.name}</p>
                    </div>
                </section>
            ))}
        </article>
    </>
}

export default SongList