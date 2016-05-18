import React from 'react';

export default class AdminList extends React.Component {
  constructor(props) {
    super();

  }

  // map wines (better map or get each info(title, description, ..) directly from home component?)
  // list of wines

  render() {
    const list = this.props.wines.map(wine => {
      return (
        <tr>
          <td>{wine.thumb}</td>
          <td>{wine.title}</td>
          <td>{wine.category}</td>
          <td>{wine.region}</td>
        </tr>
      );
    });

    return (
      <div>
        <thead>
          <tr>
            <th> Thumbnail </th>
            <th> Name </th>
            <th> Category </th>
            <th> Region </th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </div>
    );
  }
}

AdminList.propTypes = { };


