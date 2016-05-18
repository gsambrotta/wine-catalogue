import React from 'react';
import {Link} from 'react-router';
import Thumb from './common/thumb';
import './../sass/components/_cardThumb.scss';
  
const cardThumb = (props) => {
  const title = props.title;

  return (
    <li key={props.id} className='wineThumbCard'>
      <Link to={{ pathname: `${props.titleUrl}`, query: {title} }}> 
        <Thumb image={props.thumb} />
        <h2>{props.title}</h2>
        <p>{props.readmore}</p>
      </Link>
    </li>
  );
};

cardThumb.propTypes = { 
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  thumb: React.PropTypes.string.isRequired,
  readmore: React.PropTypes.string.isRequired,
  titleUrl: React.PropTypes.string.isRequired
};

export default cardThumb;

