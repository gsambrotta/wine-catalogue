import React from 'react';
import './../../sass/components/_thumb.scss';

const Thumb = (props) => {

  return (
    <div className='thumb'>
      <img src={props.image} />
    </div>
  );
};

Thumb.propTypes = { 
  image: React.PropTypes.string.isRequired
};

export default Thumb;


