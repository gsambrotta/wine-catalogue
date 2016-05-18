/* global document */
/* global client */
/* global api */

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
import $ from 'jquery';

import Home from './front-components/home';
import FrontList from './front-components/list';
import Detail from './front-components/wineDetail';

import AdminList from './admin-components/list';
import Edit from './admin-components/edit';

import './sass/main.scss';
import './../static/font/font-awesome/scss/font-awesome.scss';

const api = 'http://localhost:3000/api';
const client = 'http://localhost:3001';

export default class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      wines: [],
      regions: [],
      categories: []
    };
  }

  loadWines() {
    const self = this;

    $.getJSON(this.props.route.winesUrl)
    .done(function (data) {
      self.setState({
        wines: data
      });
    })
    .fail(function (jqxhr, textstatus, err) {
      console.log('Request failed: ' + textstatus + ' ' + err);
    });
  }

  loadRegions() {
    const self = this;

    $.getJSON(this.props.route.regionUrl)
    .done(function (data) {
      self.setState({
        regions: data
      });
    })
    .fail(function (jqxhr, textstatus, err) {
      console.log('Request failed: ' + textstatus + ' ' + err);
    });
  }

  loadCategories() {
    const self = this;

    $.getJSON(this.props.route.catUrl)
    .done(function (data) {
      self.setState({
        categories: data
      });
    })
    .fail(function (jqxhr, textstatus, err) {
      console.log('Request failed: ' + textstatus + ' ' + err);
    });
  }

  componentDidMount() {
    this.loadWines();
    this.loadRegions();
    this.loadCategories();
    // console.log(this.props)

    // is the only way i found to reload the data so i can display new wine if added
    // but i have the idea that this solution can overload the server
    /*
    let reloadWines = setInterval(() => {
      this.loadWines();
    }, 3000); 
    */
  }

  /*
  componentWillUnmount() {
    clearInterval(reloadWines);
  }
  */
  
  render() {
    return (
      <main>
        {React.cloneElement(this.props.children, {
          wines: this.state.wines,
          regions: this.state.regions,
          categories: this.state.categories
        })
        }
      </main>
    ); 
  }
}

App.propTypes = { 
  children: React.PropTypes.object.isRequired,
  winesUrl: React.PropTypes.string.isRequired,
  regionUrl: React.PropTypes.string.isRequired,
  catUrl: React.PropTypes.string.isRequired
};

/*
this.state.wines.map((wine) => 
  React.cloneElement(this.props.children, 
    {
      key: wine.id,
      id: wine.id,
      title: wine.title,
      description: wine.description,
      producer: wine.producer,
      profilePic: wine.profile_pic,
      thumb: wine.thumb,
      category: wine.category,
      region: wine.region
    }
  )
      )
*/

ReactDOM.render(

  <Router history={browserHistory}>

     <Route path='/admin' component={App}>
      <IndexRoute component={AdminList}/>
      <Route path='wines' component={Edit}/>
    </Route>

    <Route path='/' winesUrl={`${api}/wines`} regionUrl={`${api}/regions`} catUrl={`${api}/categories`} component={App}>
      <IndexRoute component={Home}/>
      <Route path='wines' component={FrontList}/>
      <Route path=':wines' component={Detail}/>
    </Route>    

  </Router>,

  document.getElementById('app')
);
