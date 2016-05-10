/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';

import Home from './front-components/home';
import FrontList from './front-components/list';
import Detail from './front-components/wineDetail';

import AdminList from './admin-components/list';
import Edit from './admin-components/edit';

import './sass/main.scss';

export default class App extends React.Component {

  // getWines()

  // getRegion()

  // getCategories

    
  render() {
    return (
      <main>
        {this.props.children}
      </main>
    ); 
  }
}

App.propTypes = { 
  children: React.PropTypes.object.isRequired
};


ReactDOM.render(

  <Router history={browserHistory}>

     <Route path='/admin' component={App}>
      <IndexRoute component={AdminList}/>
      <Route path='wines' component={Edit}/>
    </Route>

    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='wines' component={FrontList}/>
      <Route path=':wines' component={Detail}/>
    </Route>    

  </Router>,

  document.getElementById('app')
);
