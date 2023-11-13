import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Song from './Song';

const SongsList = (props) => {
    const { songs } = props;
    const sortedSongs = songs.sort((a, b) => (a._id < b._id ? -1 : 1));

    return(
        <div className='song-list'>
        {sortedSongs.map(song => {
        return (
            <Song key={song._id} id={song._id} song={song} />
          );
      })
      }
        </div>
    )
}

export default SongsList;
