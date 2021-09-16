import React from "react"

function ArtistList(data) {

    var thumbnail60
    var shortArtistList = data.shortArtistList
    var fullList = data.fullList
    
    function getThumbnail(val) {
        val.map(thumbnail => {
        if(thumbnail.width == 60){
            thumbnail60 = <img src={thumbnail.url} alt="" />
        }})
    }

    return <>
        {shortArtistList.length ? <h2>Artists</h2> : <h2>No Artists Found</h2>}
        <article>
            {shortArtistList.map(content => (
                <section key={content.browseId}>
                    <div>
                        {getThumbnail(content.thumbnails)}{thumbnail60}
                    </div>
                    
                    <div>
                        <h2>{content.name}</h2>
                    </div>
                </section>
            ))}
        </article>
    </>
}

export default ArtistList