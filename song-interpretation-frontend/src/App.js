import './App.css';
import React, { useEffect, useState } from 'react';
import SongsList from './Components/SongsList';
import { BrowserRouter, NavLink, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import SongAddForm from './Components/SongAddForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';



const App = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/songs`)
    //axios.get(`http://localhost:3001/songs`)
      .then(res => {
        console.log(res);
        setSongs(res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);
  
  return (
    <div className="App">
      {/* < SongsList songs={songs} /> */}
        <div className='app-header'>
          <div className='app-header-top'>
            <FontAwesomeIcon icon={faMusic} className="music-icon-one" />
            <h1 className='app-header-text'>SONG INTERPRETATIONS</h1>
            <FontAwesomeIcon icon={faMusic} className="music-icon-two" />
          </div>
          <nav>
            <NavLink className="nav-link" id="main" to="/">Interpret</NavLink>
            <NavLink className="nav-link" id="addSongLink" to="/add-song">Add Songs</NavLink>
          </nav>
        </div>
      <Routes>
        <Route path="songs" element={< SongsList songs={songs} />}/>
        <Route path="/" element={<Navigate  to="/songs"/>}/>
        <Route path="/add-song" element={<SongAddForm setSongs={setSongs}/>}/>
      </Routes>
      
    </div>
    )
};

export default App;
