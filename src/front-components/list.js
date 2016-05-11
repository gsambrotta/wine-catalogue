import React from 'react';
import {Link} from 'react-router';

import Thumb from './common/thumb';

const FrontList = (props) => {

  // How can i show the list of wines just from a certain category?
  const description = props.description;
  const title = props.title;
  const titleUrl = title.replace(/ /g, '-');
  const trunc = description.substr(0, 16) + '\u2026';

  return (
    <li key={props.id}>
      <Link to={{ pathname: `${titleUrl}` }}> 
        <Thumb image={props.thumb} />
        <h3>{title}</h3>
        <p>{trunc}</p>
      </Link>
    </li>
  );
  // how do i do the grid here?
};

FrontList.propTypes = { 
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  thumb: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
};

export default FrontList;
