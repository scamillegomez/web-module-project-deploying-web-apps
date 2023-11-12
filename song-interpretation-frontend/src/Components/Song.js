import React from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const Song = (props) => {
  const { id, song } = props;

  return (
    <div>
        <h3>{song.title}</h3>
        <h5>{song.artist}</h5>
        <Comments id={id}/>
    </div>
  );
}

export default Song;
