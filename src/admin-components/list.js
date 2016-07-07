import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import Griddle from 'griddle-react';

import ImageTagList from './imageTagList';
import ModifyWineStatus from './modifyWineStatus';


export default class AdminList extends React.Component {
  constructor(props) {
    super();
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('expires');

    if (!token || new Date(expires) < new Date()) {
      console.log('Not authenticated');
      this.props.history.push('/login');
    }
  }

  addActionCloumn() {
    let wines = this.props.wines;
    wines.map(wine => (
      wine['actions'] = ''
    ));
  }

  editCallback(e) {
    browserHistory.push(`/admin/edit/${e}`);
  }

  // list of wines
  render() {
    this.addActionCloumn();

    const columnMeta = [
      {
        columnName: 'thumb',
        displayName: 'Picture',
        sortable: false,
        customComponent: ImageTagList
      },
      {
        columnName: 'title',
        displayName: 'Name'
      },
      {
        columnName: 'producer',
        displayName: 'Producer'
      },
      {
        columnName: 'region',
        displayName: 'Region'
      },
      {
        columnName: 'category',
        displayName: 'Category'
      },
      {
        columnName: 'description',
        visible: false
      },
      {
        columnName: 'profilePic',
        visible: false
      },
      {
        columnName: 'actions',
        displayName: 'Actions',
        sortable: false,
        cssClassName: 'actions-cell',
        deleteCallback: this.props.deleteCallback,
        editCallback: this.editCallback,
        customComponent: ModifyWineStatus
      }
    ];


    return (
      <div>
        <button className='btn btn-secondary btn-small push-right'>
          <Link to='/admin/new'>
            <i className='fa fa-plus' aria-hidden='true'></i> Create new
          </Link>
        </button>

        <Griddle results={this.props.wines} tableClassName='table' showFilter={true}
 showSettings={true} useGriddleStyles={false}
 columnMetadata={columnMeta} columns={['thumb', 'title', 'producer', 'region', 'category', 'actions']}/>
      </div>
    );
  }
}


AdminList.propTypes = {
  wines: React.PropTypes.array
};


