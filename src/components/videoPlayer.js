import React from 'react'
import ReactPlayer from 'react-player';
const VideoPlayer = () => {
  return (
    <>   <div className='player-wrapper'>
          <ReactPlayer url='https://www.youtube.com/watch?v=q2hbYKykkHE'
             className= 'react-player'
              playing
              controls
              light
              width='100%'
              height='100%'
                />
          </div>

    </>
  )
}

export default VideoPlayer
