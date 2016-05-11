import React from 'react';

import ProfilePic from './common/profilePic';

const Detail = (props) => {

  return (
    <div>

      <headgroup>
        <h1>{props.title}</h1>
        <div className='tag_box'>
          <span>{props.category}</span>
          <span>{props.region}</span>
        </div>
        <hr />
      </headgroup>

      <main>
        <div className='sidebar'>
          <ProfilePic image={props.profilePic} />
        </div>
        <div className='container'>
          <section>
            <h3>Description</h3>
            <p>{props.description}</p>
          </section>
          <section>
            <h3>Producer</h3>
            <p>{props.producer}</p>
          </section>
        </div>
      </main>  

    </div>
  );
};

Detail.propTypes = { 
  title: React.PropTypes.string.isRequired,
  profilePic: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  producer: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  region: React.PropTypes.string.isRequired
};

export default Detail;

