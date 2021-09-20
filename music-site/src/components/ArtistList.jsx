import React from "react"
import { useHistory } from "react-router-dom"
import ShareLinks from "./ShareLinks"

function ArtistList(data) {

    var thumbnail60
    var shortArtistList = data.shortArtistList
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
        {shortArtistList.length ? <h2>Artists</h2> : <h2>No Artists Found</h2>}
        <article id="show-lists">
            {shortArtistList.map(content => (
                <section key={number = number + 1} onClick={() => goToArtist(content.browseId)} style={{"--order": number}}>
                    <div className="thumbnail">
                        {getThumbnail(content.thumbnails)}{thumbnail60}
                    </div>
                    
                    <div className="content">
                        <h2>{content.name}</h2>
                    </div>

                    <ShareLinks />
                </section>
            ))}
        </article>
    </>
}

export default ArtistList