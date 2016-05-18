import React from 'react';
  
const ProfilePic = (props) => {

  return (
    <div className='profile-pic'>
      <img src={props.image} />
    </div>
  );
};

ProfilePic.propTypes = { 
  image: React.PropTypes.string.isRequired  
};

export default ProfilePic;


