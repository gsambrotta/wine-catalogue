import React from 'react';
  
const imageTagList = (props) => {

  return (
    <img className='thumb--list' src={props.data} />
  );
};

imageTagList.propTypes = { 
  data: React.PropTypes.string
};


export default imageTagList;


