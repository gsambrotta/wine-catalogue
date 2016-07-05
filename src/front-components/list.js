import _ from 'lodash';
import React from 'react';
import CardThumb from './cardThumb.js';

export default class FrontList extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    let wines = this.props.wines;
    const {
      params: {
        winesCategory
      }
    } = this.props;

    if (winesCategory) {
      wines = wines.filter(item => item.category === winesCategory);
    } else {
      wines = this.props.wines;
    }

    const cards = wines.map(wine => {
      const description = wine.description || '';
      const title = wine.title;
      const titleUrl = title.replace(/ /g, '-');
      const trunc = description.substr(0, 100) + '\u2026';

      return (
        <CardThumb key={wine.id} id={wine.id} titleUrl={titleUrl} title={wine.title} thumb={wine.thumb} readmore={trunc} />
      );
    });

    if (_.isEmpty(wines)) {
      return (
        <div>
         <p> Sorry, no wines was found in this category. </p>
         <footer>
            <div className='smallLink' onClick={this.context.router.goBack}> 
              <i className='fa fa-long-arrow-left' aria-hidden='true'></i> back 
            </div>
          </footer>
        </div>
      );
    } 

    return (
      <section className='frontList-comp'>
        <ul className='list--inline'>
          {cards}      
        </ul>
        <footer>
          <div className='smallLink' onClick={this.context.router.goBack}> 
            <i className='fa fa-long-arrow-left' aria-hidden='true'></i> back 
          </div>
        </footer>
      </section>
    );
  }
}

FrontList.propTypes = { 
  wines: React.PropTypes.array.isRequired
};

FrontList.contextTypes = {
  router: React.PropTypes.object.isRequired
};
