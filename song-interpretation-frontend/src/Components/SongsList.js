import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Song from './Song';

const SongsList = (props) => {
    const { songs } = props;

    return(
        <div>
        {songs.map(song => {
        return (
          <div>
            <Song id={song._id} song={song} />
          </div>
          );
      })
      }
        </div>
    )
}

export default SongsList;
