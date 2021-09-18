import React from "react"

function AlbumList(data) {

    var thumbnail60
    var shortAlbumList = data.shortAlbumList
    var number = 0
    
    function getThumbnail(val) {
        val.map(thumbnail => {
        if(thumbnail.width == 60){
            thumbnail60 = <img src={thumbnail.url} alt="" />
        }})
    }

    return <>
        {shortAlbumList.length ? <h2>Albums</h2> : <h2>No Albums Found</h2>}
        <article id="show-lists">
            {shortAlbumList.map(content => (
                <section key={number = number + 1} style={{"--order": number}}>
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

export default AlbumList