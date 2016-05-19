import React from 'react';
import {Link} from 'react-router';

import './../sass/components/_home.scss';

  
const Home = (props) => {
  const categories = props.categories;

  const cats = categories.map((cat) => {
    let name = cat.name;
    let nameCorrect = name.replace(/-/g, '');
    
    // any way i can show /wines/categoryName?
    return (
      <li key={cat.id}>
        <Link to={{ pathname: `/wines/${name}` }}>
          <span> <img src={cat.logo} alt={nameCorrect} /> </span>
        </Link>
      </li>
    );
  });

  return (
    <div className='home-comp'>
      <h1 className='title'> Discover our wines by category </h1>
      <ul className='list--inline cat-list'>
        {cats}
      </ul>
      <div className='decoration-lines clear'>
        <hr className='push-left'/> 
        <h3 className='push-left'> or </h3> 
        <hr className='push-left'/>
      </div>
      <h3>
        <button className='btn btn-small'>
          <Link to='/wines'> See all wines </Link>
        </button>
      </h3>
    </div>
  );
};

Home.propTypes = { 
  categories: React.PropTypes.array.isRequired
};

export default Home;

