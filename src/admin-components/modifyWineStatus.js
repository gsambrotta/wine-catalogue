import React from 'react';
  
export default class modifyWineStatus extends React.Component {

  render() {
    return (
        <div className='edit-icons'>
          <span onClick={this.props.metadata.editCallback.bind(null, this.props.rowData.id)} >
          <i className='fa fa-pencil' aria-hidden='true'></i>
          </span>
          <span onClick={this.props.metadata.deleteCallback.bind(null, this.props.rowData.id)} >
            <i className='fa fa-trash' aria-hidden='true'></i>
          </span>
        </div>
    );
  }
}



