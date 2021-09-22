import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import PlaySong from "./PlaySong"
import ArtistSongList from "./ArtistSongList"
import ShareLinks from "./ShareLinks"

function ShowArtist() {
    const [artist, setArtist] = useState([])
    const [artistSongs, setArtistSongs] = useState([])
    const [artistAlbums, setArtistAlbums] = useState([])
    const [thumbnail816, setThumbnail816] = useState()
    const [showMoreSongs, setShowMoreSongs] = useState(false)

    var { id } = useParams()
    var data, thumbnail226
    var number = 0

    useEffect(async ()=>{
        await fetch('https://yt-music-api.herokuapp.com/api/yt/artist/' + id)
        .then(async res => {
            data = await res.json()
            if(data.products)setArtistAlbums(data.products.albums.content)
            if(data.products)setArtistSongs(data.products.songs.content)
            setArtist(data)
        })
        .catch(error => console.log(error))
        getImage(data)
    },[])

    function getImage(artist) {
        if(artist.thumbnails){
            artist.thumbnails.map(thumbnail => {
                if(thumbnail.width == 540){
                    setThumbnail816(<img src={thumbnail.url} alt="" />)
                }
            })
        }
        else setThumbnail816(<img style={{objectFit: "cover"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png" alt="" />)
    }

    function getThumbnail(thumbnails) {
        thumbnails.map(thumbnail => {
            if(thumbnail.width == 226){
                thumbnail226 = <img src={thumbnail.url} alt="" />
            }
        })
    }

    function toggleSongs(){
        setShowMoreSongs(!showMoreSongs)
    }

    const history = useHistory()

    function goToSong(name) {
        history.push('/showsong/' + name + '/' + artist.name)
    }

    return <>
        <div id='artist-page'>
            {thumbnail816}
            {artist.name ? 
                <div className="artist-name">
                    <h2>{artist.name}</h2> 
                    <ShareLinks artistId={id}/>
                </div> 
                : 
                <h2>No Artist Found</h2>
            }

            <div className="divider"></div>

            {artistSongs.length ? 
            <div>
                <h2>Top Songs</h2> 
                <> </>
            </div>
            : <h2>No Songs Found</h2>}

            {artistSongs.map(song => (
                <section key={number = number + 1} style={{"--order": number}}>
                    {artist.name ? 
                        <PlaySong song={song} artist={artist.name}/>
                        :
                        <> </>
                    }

                    <div style={{cursor: "pointer"}} onClick={() => goToSong(song.name)}>
                        <h3>{song.name}</h3>
                        <p>{song.album.name}</p>
                    </div>

                    <ShareLinks artistId={id} songName={song.name} artistName={song.artist.name}/>
                </section>
            ))}
            {showMoreSongs ? 
                <article>
                    <ArtistSongList artist={artist.name}/>
                    <a onClick={toggleSongs}>Show Less Songs</a>
                </article> 
                : 
                artistSongs.length == 5 ? 
                    <a onClick={toggleSongs}>Show More Songs</a> 
                    :
                    <> </>
                    
            }

            <div className="divider"></div>

            {artistAlbums.length ? 
            <div>
                <h2>Albums</h2> 
                <> </>
            </div>
            : <h2>No Albums Found</h2>}

            {artistAlbums.map(album => (
                <section key={number = number + 1} style={{"--order": number}}>
                    <div>
                        {getThumbnail(album.thumbnails)} {thumbnail226}
                    </div>
                    
                    <div>
                        <h3>{album.name}</h3>
                        <p>{artist.name}</p>
                    </div>
                </section>
            ))}
                
        </div>
    </>
    
}

export default ShowArtist