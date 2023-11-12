import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const songInitialState = {
    title: "",
    artist: "",
  };

const SongAddForm = (props) => {

  const { setSongs } = props;
  const [songItem, setSongItem] = useState(songInitialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSongItem({
      ...songItem,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(songItem);
   axios.post(`${process.env.REACT_APP_API_URL}/songs`, songItem)
   // axios.post(`http://localhost:3001/songs`, songItem)
      .then(res => {
        console.log(res);
        setSongs(prevSongs=> [...prevSongs, res.data]);
        setSongItem(songInitialState);
        navigate('/songs');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const { title, artist } = songItem;

  return (
    <div className='song-add-container'>
        <form className="song-add-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={title}
                placeholder="song title"
                onChange={handleChange}
                className='song-add-element'
            />
            <input 
                type="text" 
                name="artist"
                value={artist}
                placeholder="song artist"
                onChange={handleChange}
                className='song-add-element'
            />
            <button id="button"className='song-add-element button'>ADD SONG</button>
        </form>
    </div>
  );
}

export default SongAddForm;