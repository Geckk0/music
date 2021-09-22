import React, { useState, useRef } from "react"

function ShareLinks(data){
    const [show, setShow] = useState(false)
    const textRef = useRef(null)
    const [copyArtist, setCopyArtist] = useState("")
    const [copySong, setCopySong] = useState("")

    var artistId = data.artistId
    var songName = data.songName
    var artistName = data.artistName

    function toggleShare(){
        setShow(!show)
        setCopyArtist("")
        setCopySong("")
    }

    function copyArtistLink(link){
        //Set, select and copy value in offscreen textarea
        textRef.current.value = link
        textRef.current.select();
        document.execCommand('copy')
        setCopyArtist("Copied!")
        setCopySong("")
    }

    function copySongLink(link){
        //Set, select and copy value in offscreen textarea
        textRef.current.value = link
        textRef.current.select();
        document.execCommand('copy')
        setCopySong("Copied!")
        setCopyArtist("")
    }

    return <>
        <div id="share-links">
            {/* Create text area to set links when copying */}
            <textarea ref={textRef} style={{ opacity: 0, position: "absolute", top: "-2000px" }}></textarea>
            <button onClick={toggleShare}>. . .</button>
            {show ? 
                <section>
                    {artistId ? 
                        <div> 
                            <p onClick={() => copyArtistLink("http://localhost:3000/showartist/" + artistId)}>Share Aritst</p>
                            {copyArtist}
                        </div>
                        :
                        <> </>
                    }
                    {songName ? 
                        <div>
                            <p onClick={() => copySongLink("http://localhost:3000/showsong/" + songName + "/" + artistName)}>Share Song</p>
                            {copySong}
                        </div>
                        :
                        <> </>
                    }
                </section>
                :
                <> </>
            }
        </div>
    </>
}

export default ShareLinks