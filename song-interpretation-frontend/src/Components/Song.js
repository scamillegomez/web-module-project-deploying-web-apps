import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const Song = (props) => {
  const { id, song } = props;
  const [showComments, setShowComments] = useState(true);

  const toggleComments = () => setShowComments(!showComments);

  return (
    <div className="song-item" >
      <div className='song-item-header'>
        <button onClick={toggleComments}>
        {showComments ? '-' : '+'} {/* Change button text based on state */}
        </button>
        <div className='song-item-header-text'>
          <h3>{song.title}</h3>
          <h5>{song.artist}</h5>
        </div>
      </div>
      {showComments && <Comments id={id}/>} {/* Show Comments conditionally */}
    </div>
  );
}

export default Song;
