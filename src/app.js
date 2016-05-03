/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';

import './sass/main.scss';

export default class App extends React.Component {
    
  render() {
    return (
      <main>
        Let's start now!
      </main>
    ); 
  }
}


ReactDOM.render(

  <Router history={browserHistory}>

    <Route path='/' component={App} />

  </Router>,

  document.getElementById('app')
);
