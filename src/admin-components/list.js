import React from 'react';
import Griddle from 'griddle-react';
import $ from 'jquery';

import ImageTagList from './imageTagList';
import ModifyWineStatus from './modifyWineStatus';


export default class AdminList extends React.Component {
  constructor(props) {
    super();
  }

  
  addActionCloumn() {
    let wines = this.props.wines;
    wines.map(wine => (
      wine['actions'] = ''
    ))
  }

  editCallback() {
    console.log('edit it');
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
        deleteCallback : this.props.deleteCallback,
        editCallback : this.editCallback,
        customComponent: ModifyWineStatus
      }
    ]


    return (
      <div>
        <Griddle results={this.props.wines} tableClassName='table' showFilter={true}
 showSettings={true} useGriddleStyles={false}
 columnMetadata={columnMeta} columns={['thumb', 'title', 'producer', 'region', 'category', 'actions']}/>
      </div>
    );
  }
}


AdminList.propTypes = { };


