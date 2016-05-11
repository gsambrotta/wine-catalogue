import React from 'react';
import {Link} from 'react-router';
  
const Home = (props) => {
  const categories = props.categories;

  const cats = categories.map((cat) => {
    let name = cat.name;
    let nameCorrect = name.replace(/-/g, '');
    
    return (
      <li key={cat.id}>
        <Link to={{ pathname: `/wines/${cat.name}` }}>
          <span> <img src={cat.logo} /> </span>
          <p>{nameCorrect}</p>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h1> Discover our wines by category </h1>
      {cats}
      <span> or </span>
      <h3><Link to='/wines'> See all wines </Link></h3>
    </div>
  );
};

Home.propTypes = { 
  categories: React.PropTypes.array.isRequired
};

export default Home;

