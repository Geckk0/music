import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { Context } from '../App'

function Home(){
    const [context, updateContext] = useContext(Context)
    const [song, setSong] = useState()

    //Words for Random Sentence
    const firstWord = ['The', 'One', 'Wow', 'Never', 'Dont', 'You', 'What', 'Road', 'That', 'Christmas', 'Happy', '100', '1', 'Break']
    const secondWord = ['Space', 'Me', 'Leave', 'Im', 'Do', 'Give', '', 'Walk', 'Snow', 'Rain', '', 'Sun', 'Bad', 'Wolf', 'Good', 'Home']
    const thirdWord = ['Trips', 'Up', 'Monkeys', '', 'Legos', 'Butts', 'Hats', '', 'Roofs', 'Days', 'Face', 'Rocks']

    async function getRandomSentence(){
        let tempWord
        tempWord = firstWord[Math.floor(Math.random()*firstWord.length)]
        tempWord = tempWord + ' ' + secondWord[Math.floor(Math.random()*secondWord.length)]
        tempWord = tempWord + ' ' + thirdWord[Math.floor(Math.random()*thirdWord.length)]

        console.log(tempWord)

        let content, data

        await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + tempWord)
        .then(async res => {
            data = await res.json()
                if(!content){
                    content = data.content[Math.floor(Math.random()*data.content.length)]
                    
                    setSong(content)
                    updateContext({
                        playedSong: content,
                        isLoaded: true,
                        isPlaying: true,
                        isPlayingId: content.videoId
                    })
                    player.loadPlaylist(content.videoId)
                }
        })
        .catch(error => console.log(error))
    }

    const history = useHistory()

    function goToArtist(id) {
        history.push('/showartist/' + id)
    }

    function goToSong(name, artist) {
        if(artist.length > 1){
            artist = artist[0]
        }
        history.push('/showsong/' + name + '/' + artist.name)
    }

    return <>
        <div id="home-page">
            <img src="\src\images\jespersljudio.png" alt="Sample Name" />
            <section>
                <button onClick={() => getRandomSentence()}>Play <br/> Random <br/> Song</button>
                {song ? 
                    <div>
                        <h2>Your Random Song Is</h2>
                        <h3 onClick={ () => goToSong(song.name, song.artist)}>{song.name}</h3>
                        {song.artist.name ?
                            <p>By <em onClick={ () => goToArtist(song.artist.browseId)}>{song.artist.name}</em></p>
                            :
                            <> </>
                        }
                        
                    </div>
                    :
                    <> </>
                }
            </section>
        </div>
    </>
}

export default Home