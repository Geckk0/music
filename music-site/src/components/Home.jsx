import React from "react"

function Home(){

    let player;

    // gets called automatically when YouTube player loads
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            height: '0',
            width: '0',
            videoId: 'JW5meKfy3fY',
            events: {
            'onStateChange': onPlayerStateChange,
            }
        });
    }

    // this function triggers when we change song in player
    // can be used to update things, like counters
    function onPlayerStateChange(event) {
        if (event.data != YT.PlayerState.PLAYING) return
    }

    return <>
        <div id="home-page">
                <h1>Home</h1>
            <div>
                <button >Do nothing</button>
            </div>
        </div>
    </>
}

export default Home