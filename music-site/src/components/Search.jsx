import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"

import SongList from "./SongList"
import ArtistList from "./ArtistList"
import AlbumList from "./AlbumList"

function Search(){
    var { term, value } = useParams()

    const [searchValue, searchValueUpdateMethod] = useState(value)
    const [searchTerm, setSearchTerm] = useState(term)
    const [fullList, setFullList] = useState([])
    const [shortSongList, setShortSongList] = useState([])
    const [shortArtistList, setShortArtistList] = useState([])
    const [shortAlbumList, setShortAlbumList] = useState([])
    const [noResult, setNoResult] = useState(true)

    const [showSongs, setShowSongs] = useState([false])
    const [showArtists, setShowArtists] = useState([false])
    const [showAlbums, setShowAlbums] = useState([false])
    var data

    const history = useHistory()

    function pushSearch(){
        if(searchValue){
            history.push('/search/' + searchTerm + '/' + searchValue)
        }
        else{
            history.push('/search/' + searchTerm)
        }
        
    }

    useEffect(() => {
        switch(term){
            case '':
                setSearchTerm('search')
                searchAll()
            break
            case 'search':
                searchAll()
            break
            case 'songs':
                searchSongs()
            break
            case 'artists':
                searchArtists()
            break
        }

        submitSearch()
    }, [term, value])

    async function submitSearch() {
        let search = searchValue
        let term = searchTerm

        setFullList([])
        setShortSongList([])
        setShortArtistList([])
        setShortAlbumList([])
        
        if(search){
            console.log(search)
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
            setShortSongList(val)
            setShowSongs(true)
            setShowArtists(false)
            setShowAlbums(false)
        }
        else if (searchTerm == 'artists'){
            setShortArtistList(val)
            setShowArtists(true)
            setShowSongs(false)
            setShowAlbums(false)
        }
        else if (searchTerm == 'albums'){
            setShortAlbumList(val)
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

    //Search on pressing enter
    const handleKeyPress = e => {
        if(e.key == "Enter"){
            pushSearch()
        }
    }

    return <>
    <div id="search-page">
        <h1>Search</h1>
        <section>
            <input onKeyPress={handleKeyPress} value={searchValue} onChange={(e)=>searchValueUpdateMethod(e.target.value)}/>
            <button onClick={pushSearch}>&gt;</button>
        </section>
        <div>
            <button id='searchAllButton' className='no-focus-button' onClick={searchAll}>All</button>
            <button id='searchSongsButton' className='no-focus-button' onClick={searchSongs}>Songs</button>
            <button id='searchArtistsButton' className='no-focus-button' onClick={searchArtists}>Artists</button>
            <button style={{textDecoration: "line-through"}} id='searchAlbumsButton' className='no-focus-button' /*onClick={searchAlbums}*/>Albums</button>
        </div>

        <div className="divider"></div>

        {noResult ?
            <p>No Search Results Found</p> 
            :
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
                </> : <></> 
            }
            </>
        }
    </div>
    </>
}

export default Search