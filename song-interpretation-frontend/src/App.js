import './App.css';
import React, { useEffect, useState } from 'react';
import SongsList from './Components/SongsList';
import { BrowserRouter, NavLink, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import SongAddForm from './Components/SongAddForm';


const App = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/songs`)
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
      
        <h1>Song Interpretations</h1>
        <nav>
          <NavLink id="main" to="/">Interpret</NavLink>
          <NavLink id="addSongLink" to="/add-song">Add Songs</NavLink>
        </nav>
      
      <Routes>
        <Route path="songs" element={< SongsList songs={songs} />}/>
        <Route path="/" element={<Navigate  to="/songs"/>}/>
        <Route path="/add-song" element={<SongAddForm setSongs={setSongs}/>}/>
      </Routes>
      
    </div>
    )
};

export default App;
