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
    axios.post(`http://localhost:3001/songs`, songItem)
      .then(res => {
        console.log(res);
        setSongs(prevSongs=> [...prevSongs, res.data]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(
        setSongItem(songInitialState),
        navigate('/songs')
        );
  }

  const { title, artist } = songItem;

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={title}
                placeholder="song title"
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="artist"
                value={artist}
                placeholder="song artist"
                onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    </div>
  );
}

export default SongAddForm;