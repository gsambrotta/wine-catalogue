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
    const that = this;

    $.getJSON(this.props.route.winesUrl)
    .done(function (data) {
      that.setState({
        wines: data
      });
    })
    .fail(function (jqxhr, textstatus, err) {
      console.log('Request failed: ' + textstatus + ' ' + err);
    });
  }

  loadRegions() {
    const that = this;

    $.getJSON(this.props.route.regionUrl)
    .done(function (data) {
      that.setState({
        regions: data
      });
    })
    .fail(function (jqxhr, textstatus, err) {
      console.log('Request failed: ' + textstatus + ' ' + err);
    });
  }

  loadCategories() {
    const that = this;

    $.getJSON(this.props.route.catUrl)
    .done(function (data) {
      that.setState({
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

    // is the only way i found to reload the data so i can display new wine if added
    // but i have the idea that this solution can overload the server
    let reloadWines = setInterval(() => {
      this.loadWines();
    }, 3000);
  }

  componentDidUnmount() {
    clearInterval(reloadWines);
  }
  
  // can i do that?? 
  render() {
    return (
      <main>
        {React.cloneElement(this.props.children, 
          {
            wines: this.state.wines,
            regions: this.state.regions,
            categories: this.state.categories
          }
        )}

        {this.state.wines.map((wine) => React.cloneElement(this.props.children, {
          id: wine.id,
          title: wine.title,
          description: wine.description,
          producer: wine.producer,
          profile_pic: wine.profile_pic,
          thumb: wine.thumb,
          category: wine.category,
          region: wine.region
        }))}
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
