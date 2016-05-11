import React from 'react';
  
const ProfilePic = (props) => {

  return (
    <div className='profile-pic'>
      <img src={props.profilePic} />
    </div>
  );
};

ProfilePic.propTypes = { 
  profilePic: React.PropTypes.string.isRequired  
};

export default ProfilePic;


