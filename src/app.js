/* global document */
/* global client */
/* global api */
/* global window */

import React from 'react/dist/react-with-addons';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
import $ from 'jquery';
import _ from 'lodash';

import Home from './front-components/home';
import FrontList from './front-components/list';
import Detail from './front-components/wineDetail';

import Login from './admin-components/login';
import AdminList from './admin-components/list';
import EditWrap from './admin-components/editWrap';
import New from './admin-components/new';

import './sass/main.scss';
import './../static/font/font-awesome/scss/font-awesome.scss';

const api = 'http://localhost:3000/api';
const client = 'http://localhost:3001';

// Debugging
window.jQuery = $;
//

export default class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      wines: [],
      regions: [],
      categories: []
    };
  }

  // Loading all date
  loadWines() {
    const self = this;

    $.getJSON(this.props.route.winesUrl)
    .done(function (data) {
      console.log('Successfully received data from the server, updating state with:', data);
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

  // Save new item from /admin/new
  saveLogin(user) {
    const id = Date.now();
    const url = `${api}/login`;

    const req = $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      date: user
    });

    req.done(() => {
      console.log('connect!');
    });

    req.fail((xhr, status, err) => {
      console.error(url, status, err.toString());
    });
  }


  // Save new item from /admin/new
  saveNew(newWine) {
    const id = Date.now();
    const url = `${api}/wines/${id}`;

    const req = $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: newWine
    });

    req.done(() => {
      this.loadWines();
    });

    req.fail((xhr, status, err) => {
      console.error(url, status, err.toString());
    });
  }

  // Save the edited item from /admin/edit
  onEditSave(wineEdited) {
    const url = `${api}/wines/${wineEdited.id}`;
    const req = $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: wineEdited
    });

    req.done(() => {
      this.loadWines();
    });

    req.fail((xhr, status, err) => {
      console.error(url, status, err.toString());
    });
  }

  // Delete the item from /admin
  deleteCallback(id) {
    const url = `${api}/wines/${id}`;
    const req = $.ajax({
      url: url,
      dataType: 'json',
      type: 'DELETE'
    });

    req.done(() => {
      this.loadWines();
    });

    req.fail((xhr, status, err) => {
      console.error(url, status, err.toString());
    });
  }


  componentDidMount() {
    this.loadWines();
    this.loadRegions();
    this.loadCategories();
  }

  render() {
    return (
      <main>
        {React.cloneElement(this.props.children, {
          wines: this.state.wines,
          regions: this.state.regions,
          categories: this.state.categories,
          deleteCallback: this.deleteCallback.bind(this),
          onEditSave: this.onEditSave.bind(this),
          saveNew: this.saveNew.bind(this)
          // sendLogin: this.sendLogin.bind(this)
        })
        }
      </main>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired
};


ReactDOM.render(

  <Router history={browserHistory}>

    <Route path='/login' component={Login} />

    <Route path='/admin' winesUrl={`${api}/wines`} regionUrl={`${api}/regions`} catUrl={`${api}/categories`} component={App}>
      <IndexRoute component={AdminList}/>
      <Route path='/admin/edit/:wineId' component={EditWrap}/>
      <Route path='/admin/new' component={New}/>
    </Route>

    <Route path='/' winesUrl={`${api}/wines`} regionUrl={`${api}/regions`} catUrl={`${api}/categories`} component={App}>
      <IndexRoute component={Home}/>
      <Route path='wines' component={FrontList}/>
      <Route path='wines/:winesCategory' component={FrontList}/>
      <Route path=':wines' component={Detail}/>
    </Route>

  </Router>,

  document.getElementById('app')
);
