import React from "react"

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

    return <>
        {shortSongList.length ? <h2>Songs</h2> : <h2>No Songs Found</h2>}
        <article>
            {shortSongList.map(content => (
                <section key={content.videoId}>
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