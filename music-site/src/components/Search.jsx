import React, { useState } from "react"

import SongList from "./SongList"
import ArtistList from "./ArtistList"
import AlbumList from "./AlbumList"

function Search(){

    const [searchValue, searchValueUpdateMethod] = useState('')
    const [searchTerm, setSearchTerm] = useState(['search']);
    const [fullList, setFullList] = useState([]);
    const [shortSongList, setShortSongList] = useState([]);
    const [shortArtistList, setShortArtistList] = useState([]);
    const [shortAlbumList, setShortAlbumList] = useState([]);
    const [noResult, setNoResult] = useState(true);

    const [showSongs, setShowSongs] = useState([false]);
    const [showArtists, setShowArtists] = useState([false]);
    const [showAlbums, setShowAlbums] = useState([false]);
    var data

    async function submitSearch() {
        let search = searchValue
        let term = searchTerm

        setFullList([])
        setShortSongList([])
        setShortArtistList([])
        setShortAlbumList([])
        
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
        setNoResult(false)
        
        if(val.length < 1){
            setShortSongList(val.slice(0, 4))
            setNoResult(true)
        } 
        else if (searchTerm == 'search'){
            val.map(content => { if(content.type == 'song') tempSong = [...tempSong, content]})
            val.map(content => { if(content.type == 'artist') tempArtist = [...tempArtist, content]})
            val.map(content => { if(content.type == 'album') tempAlbum = [...tempAlbum, content]})
            
            setShortSongList(tempSong.slice(0, 4))
            setShortArtistList(tempArtist.slice(0, 4))
            setShortAlbumList(tempAlbum.slice(0, 4))

            setShowSongs(true)
            setShowArtists(true)
            setShowAlbums(true)
        }
        else if (searchTerm == 'songs'){
            setShortSongList(val.slice(0, 4))
            setShowSongs(true)
            setShowArtists(false)
            setShowAlbums(false)
        }
        else if (searchTerm == 'artists'){
            setShortArtistList(val.slice(0, 4))
            setShowArtists(true)
            setShowSongs(false)
            setShowAlbums(false)
        }
        else if (searchTerm == 'albums'){
            console.log(val)
            setShortAlbumList(val.slice(0, 4))
            setShowAlbums(true)
            setShowSongs(false)
            setShowArtists(false)
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

    const handleKeyPress = e => {
        if(e.key == "Enter"){
            submitSearch()
        }
    }

    return <>
    <div id="search-page">
        <h1>Search</h1>
        <section>
            <input onKeyPress={handleKeyPress} value={searchValue} onChange={(e)=>searchValueUpdateMethod(e.target.value)}/>
            <button onClick={submitSearch}>&gt;</button>
        </section>
        <div>
            <button id='searchAllButton' className='no-focus-button focus-button' onClick={searchAll}>All</button>
            <button id='searchSongsButton' className='no-focus-button' onClick={searchSongs}>Songs</button>
            <button id='searchArtistsButton' className='no-focus-button' onClick={searchArtists}>Artists</button>
            <button style={{textDecoration: "line-through"}} id='searchAlbumsButton' className='no-focus-button' /*onClick={searchAlbums}*/>Albums</button>
        </div>

        <div className="divider"></div>

        {noResult ?
            <p>No Search Results Found</p> :
        <>
            {showSongs ? 
            <>

                <SongList shortSongList={shortSongList}/>

                <div className="divider"></div>
            </> : <></> }
            
            {showArtists ? 
            <>
                
                <ArtistList shortArtistList={shortArtistList}/>

                <div className="divider"></div>
            </> : <></> }

            {showAlbums ? 
            <>
                
                <AlbumList shortAlbumList={shortAlbumList}/>
                
                <div className="divider"></div>
            </> : <></> }

        </>}
        
        
        
    </div>
    </>
}

export default Search