import React from 'react';
  
const Thumb = (props) => {

  return (
    <div className='thumb'>
      <img src={props.thumb} />
    </div>
  );
};

Thumb.propTypes = { 
  thumb: React.PropTypes.string.isRequired
};

export default Thumb;


