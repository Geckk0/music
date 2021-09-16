import React, { useState, useEffect } from "react"

function Search(){

    const [searchValue, searchValueUpdateMethod] = useState('')
    const [fullList, setFullList] = useState([]);
    const [shortSongList, setShortSongList] = useState([]);
    const [shortArtistList, setShortArtistList] = useState([]);
    const [shortAlbumList, setShortAlbumList] = useState([]);
    const [noResult, setNoResult] = useState([]);

    const [searchTerm, setSearchTerm] = useState(['search']);
    var data, thumbnail60

    async function submitSearch() {
        let search = searchValue
        let term = searchTerm

        setFullList([])
        setShortSongList([])
        
        if(search != ''){
            await fetch('https://yt-music-api.herokuapp.com/api/yt/' + term + '/' + search)
            .then(async res => {
                data = await res.json()
            })
            setFullList(data.content)
            checkResult(data.content)
        }
        else{
            checkResult([])
        }
    }

    function checkResult(val){
        let tempSong = []
        let tempArtist = []
        let tempAlbum = []
        setNoResult("")
        console.log(val)

        if(val.length < 1){
            setShortSongList(val.slice(0, 4))
            setNoResult("No Search Results Found")
        } 
        else if (searchTerm == 'search'){
            
            val.map(content => { if(content.type == 'song') tempSong = [...tempSong, content]})
            val.map(content => { if(content.type == 'artist') tempArtist = [...tempArtist, content]})
            val.map(content => { if(content.type == 'album') tempAlbum = [...tempAlbum, content]})
            setShortSongList(tempSong.slice(0, 4))
            setShortArtistList(tempArtist.slice(0, 4))
            setShortAlbumList(tempAlbum.slice(0, 4))
        }
        else if (searchTerm == 'songs'){
            setShortSongList(val.slice(0, 4))
        }
        else if (searchTerm == 'artists'){
            setShortArtistList(val.slice(0, 4))
        }
        else if (searchTerm == 'albums'){
            setShortAlbumList(val.slice(0, 4))
        }
    }

    function searchAll() {
        document.getElementById('searchAllButton').classList.add('focus-button')

        document.getElementById('searchSongsButton').classList.remove('focus-button')
        document.getElementById('searchArtistsButton').classList.remove('focus-button')
        document.getElementById('searchAlbumsButton').classList.remove('focus-button')
        setSearchTerm('search')
    }

    function searchSongs() {
        document.getElementById('searchSongsButton').classList.add('focus-button')

        document.getElementById('searchAllButton').classList.remove('focus-button')
        document.getElementById('searchArtistsButton').classList.remove('focus-button')
        document.getElementById('searchAlbumsButton').classList.remove('focus-button')
        setSearchTerm('songs')
    }

    function searchArtists() {
        document.getElementById('searchArtistsButton').classList.add('focus-button')

        document.getElementById('searchSongsButton').classList.remove('focus-button')
        document.getElementById('searchAllButton').classList.remove('focus-button')
        document.getElementById('searchAlbumsButton').classList.remove('focus-button')
        setSearchTerm('artists')
    }

    function searchAlbums() {
        document.getElementById('searchAlbumsButton').classList.add('focus-button')

        document.getElementById('searchSongsButton').classList.remove('focus-button')
        document.getElementById('searchArtistsButton').classList.remove('focus-button')
        document.getElementById('searchAllButton').classList.remove('focus-button')
        setSearchTerm('albums')
    }

    function getThumbnail(val) {
        val.map(thumbnail => {
        if(thumbnail.width == 60){
            thumbnail60 = <img src={thumbnail.url} alt="" />
        }})
    }

    return <>
    <div id="search-page">
        <h1>Search</h1>
        <section>
            <input value={searchValue} onChange={(e)=>searchValueUpdateMethod(e.target.value)}/>
            <button onClick={submitSearch}>&gt;</button>
        </section>
        <div>
            <button id='searchAllButton' className='no-focus-button focus-button' onClick={searchAll}>All</button>
            <button id='searchSongsButton' className='no-focus-button' onClick={searchSongs}>Songs</button>
            <button id='searchArtistsButton' className='no-focus-button' onClick={searchArtists}>Artists</button>
            <button id='searchAlbumsButton' className='no-focus-button' onClick={searchAlbums}>Albums</button>
        </div>

        <div className="divider"></div>

        <p>{noResult}</p>

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

        <div className="divider"></div>

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
        
        
        
    </div>
    </>
}

export default Search