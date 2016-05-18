import React from 'react';
import ProfilePic from './common/profilePic';
import './../sass/components/_detail.scss';

export default class Detail extends React.Component {
  
  constructor(props){
    super();

    this.findWine = this.findWine.bind(this);
  }

  findWine(wine) {
    return wine.title === this.props.location.query.title
  }

  render() {

    const currentWine = this.props.wines.find(this.findWine);
    return (
      <div className='detail-comp'>
        <headgroup>
          <h1>{currentWine.title}</h1>
          <div className='tag_boxes'>
            <span>{currentWine.category}</span>
            <span>{currentWine.region}</span>
          </div>
          <hr />
        </headgroup>
         <main>
          <div className='sidebar'>
            <ProfilePic image={currentWine.profilePic} />
          </div>
          <div className='container'>
            <section>
              <h3>Description</h3>
              <p>{currentWine.description}</p>
            </section>
            <section>
              <h3>Producer</h3>
              <p>{currentWine.producer}</p>
            </section>
          </div>
          </main>
          <footer>
            <div className='smallLink' onClick={this.context.router.goBack}> 
              <i className='fa fa-long-arrow-left' aria-hidden='true'></i> back 
            </div>
          </footer> 
      </div>
    );
  }
}

Detail.propTypes = { 
  wines: React.PropTypes.array.isRequired
};


Detail.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Detail;

