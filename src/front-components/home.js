import React from 'react';
import {Link} from 'react-router';
  
const Home = (props) => {

  return (
    <Link to='/wines'> See all wines </Link>
  );
};

Home.propTypes = { };

export default Home;

