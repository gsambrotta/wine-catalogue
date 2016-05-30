/* global document */
/* global client */
/* global api */

import React from 'react/dist/react-with-addons';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
import $ from 'jquery';

import Home from './front-components/home';
import FrontList from './front-components/list';
import Detail from './front-components/wineDetail';

import AdminList from './admin-components/list';
import EditWrap from './admin-components/editWrap';

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

  onEditSave(wineEdited) {
    console.log(wineEdited);
    const url = `${api}/wines:${wineEdited.id}`;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: wineEdited,
      success: function(data) {
        this.setState({wines: wineEdited}) // need to push/rewrite the wines array
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    })
  }

  // Doesn't delete nothing :(
  deleteCallback(index) {
    this.setState({
      wines: React.addons.update(this.state.wines, {$splice: [[index, 1]] })
    }); 
    console.log('deleted!');
    this.loadWines(); 
  }

  componentDidMount() {
    this.loadWines();
    this.loadRegions();
    this.loadCategories();

    // is the only way i found to reload the data so i can display new wine if added
    // but i have the idea that this solution can overload the server
    const reloadWines = setInterval(() => {
      this.loadWines();
    }, 20000); 
    
  }

  
  componentWillUnmount() {
    clearInterval(reloadWines);
  }
    
  render() {
    return (
      <main>
        {React.cloneElement(this.props.children, {
          wines: this.state.wines,
          regions: this.state.regions,
          categories: this.state.categories,
          deleteCallback: this.deleteCallback.bind(this),
          onEditSave: this.onEditSave.bind(this)
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

     <Route path='/admin' winesUrl={`${api}/wines`} regionUrl={`${api}/regions`} catUrl={`${api}/categories`} component={App}>
      <IndexRoute component={AdminList}/>
      <Route path='/admin/edit/:wineId' component={EditWrap}/>
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
