import React, { useState, useEffect } from 'react'


import UIcard from './common/UIcard';
import Grid from '@material-ui/core/Grid';
// import Container from '@material-ui/core/Container';

import dataService from '../services/dataServices';
import { toast } from 'react-toastify';

// const feedlist = [
//   { pageName: 'Tremollo', url: 'https://www.youtube.com/watch?v=EbcdDXEPukk' },
//   { pageName: 'Music5', url: 'https://www.youtube.com/watch?v=hMBKmQEPNzI' },
//   { pageName: 'Oreo', url: 'https://www.youtube.com/watch?v=U77d9912lrw&list=PLYSL2BvdlOr7y1OtHp_PSUyzC-3kiq64L' },
//   { pageName: 'Frapp', url: 'https://www.youtube.com/watch?v=7N-f4uVvzAk' },
//   { pageName: 'Tremollo', url: 'https://www.youtube.com/watch?v=EbcdDXEPukk' },
//   { pageName: 'Music5', url: 'https://www.youtube.com/watch?v=hMBKmQEPNzI' },
//   { pageName: 'Oreo', url: 'https://www.youtube.com/watch?v=U77d9912lrw&list=PLYSL2BvdlOr7y1OtHp_PSUyzC-3kiq64L' },
//   { pageName: 'Frapp', url: 'https://www.youtube.com/watch?v=7N-f4uVvzAk' },
//   { pageName: 'Tremollo', url: 'https://www.youtube.com/watch?v=EbcdDXEPukk' },
//   { pageName: 'Music5', url: 'https://www.youtube.com/watch?v=hMBKmQEPNzI' },
//   { pageName: 'Oreo', url: 'https://www.youtube.com/watch?v=U77d9912lrw&list=PLYSL2BvdlOr7y1OtHp_PSUyzC-3kiq64L' },
//   { pageName: 'Frapp', url: 'https://www.youtube.com/watch?v=7N-f4uVvzAk' },
// ]

// const play = [
//   {name: 'Classic'},
//   {name: 'Happiness'},
//   {name: 'Work life '},
//   {name: 'Cool'}
// ]
const storageURL = 'https://eddy-bucket-0-1.s3.ap-south-1.amazonaws.com/';
const params = {
  pageNumber: 1,
  rowCount: 10
}
// const play = [
//   { name: 'Classic' },
//   { name: 'Happiness' },
//   { name: 'Work life ' },
//   { name: 'Cool' }
// ]
const Feed = (props) => {

  const { user } = props;
  const [feed, setFeed] = useState([]);
  // const [playlist, setPlaylist] = useState(play);
  
  useEffect(() => {
    async function fetchFeedData(resource, params) {
      try {
        const { data } = await dataService.getData(resource, params);
        // console.log(data);
        setFeed(data.body);
      }
      
      catch (e) {
        console.log(e);
        toast.error('Something went wrong');
      }
    }
     fetchFeedData('feed', params);

  }, [])
  return (
    <>
    <Grid container spacing={3}>
      {feed.map(f => (
        <Grid item xs={12} lg={3} sm={6}>
          <UIcard
            pageName={f.pageName}
            description={f.caption}
            date={f.dateUpload}
            url={storageURL + f.mediaLink}
            userId={user.userId}
          />
          <br />
        
          
          </Grid>
      ))}
      </Grid>
      </>
  )
}
    
    export default Feed
