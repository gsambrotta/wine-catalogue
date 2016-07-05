import React from 'react';
import $ from 'jquery';

import ImageUpload from './common/imageUpload.js';


export default class New extends React.Component {
  constructor(props) {
    super();

    this.state = {
      title: '',
      description: '',
      producer: '',
      category: '',
      region: ''
    };
  }

  showCategoryTag() {
    const cat = this.props.categories.map(category => {
      return (
        <button key={category.id} className={category.name} onClick={this.setTagClass.bind(this)}>
          {category.name}
        </button>
      );
    });

    return cat;
  }


  setTagClass(evt) {
    evt.preventDefault();

    let target = evt.target;
    $('.tags button').removeClass('selected-tag');
    $(target).addClass('selected-tag');

    this.setState({
      category: $('.selected-tag').text()
    });
  }


  showRegionSelect() {
    const regions = this.props.regions;
    const regionsOption = regions.map(region => {
      return (
        <option key={region} value={region}> {region} </option>
      );
    });
    return regionsOption;
  }

  handleNewTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleNewDesc(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleNewProducer(e) {
    this.setState({
      producer: e.target.value
    });
  }

  handleNewRegion(e) {
    this.setState({
      region: e.target.value
    });
  }

  handleReset(evt) {
    evt.preventDefault();

    this.setState({
      title: '',
      description: '',
      producer: '',
      category: '',
      region: ''
    });

    $('.tags button').removeClass('selected-tag');

  }

  onImageSave(profilePic) {
    console.log(profilePic);
    this.setState({
      profilePic: profilePic.profilePic
    }) 
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const id = Date.now();
    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let thumb = this.state.profilePic;
    let producer = this.state.producer.trim();
    let category = this.state.category;
    let region = this.state.region;
    if (!title || !description || !producer || !category || !region || !thumb) {
      return;
    }

    

    this.props.saveNew({
      id,
      title,
      description,
      thumb,
      producer,
      category,
      region
    });

    this.context.router.goBack();
  }

  render() {

    return (
      <div className='form-entry new-comp'>

      <form onSubmit={this.handleSubmit.bind(this)}>
        <header>
          <div className='smallLink' onClick={this.context.router.goBack}>
            <i className='fa fa-long-arrow-left' aria-hidden='true'></i> back
          </div>
        </header>

        <main>

          <div className='form-group'>
            <ImageUpload onImageSave={this.onImageSave.bind(this)} name={this.state.title} />
          </div>

          <div className='form-group'>
            <label> Here goes your title: </label>
            <input type='text' className='input-title' value={this.state.title} onChange={this.handleNewTitle.bind(this)}/>
          </div>

          <div className='form-group'>
            <label> Here goes your description: </label>
            <textarea rows='4' cols='50' value={this.state.description} onChange={this.handleNewDesc.bind(this)}></textarea>
          </div>

          <div className='form-group'>
            <label> Here goes producer information: </label>
            <textarea rows='4' cols='50' value={this.state.producer} onChange={this.handleNewProducer.bind(this)}></textarea>
          </div>

          <div className='form-group'>
            <label> Choose the region here: </label>
            <select value={this.state.region} onChange={this.handleNewRegion.bind(this)}>
              {this.showRegionSelect()}
            </select>
          </div>

          <div className='form-group tags'>
            <label> Click on the wine category you want: </label>
            {this.showCategoryTag()}
          </div>

        </main>

        <footer>
          <div className='smallLink' onClick={this.context.router.goBack}>
            <i className='fa fa-long-arrow-left' aria-hidden='true'></i> back without saving
          </div>

          <div className='push-right'>
            <div className='btn btn-inline reset'>
              <button onClick={this.handleReset.bind(this)}> Reset </button>
            </div>

            <div className='btn btn-inline save'>
              <button type='submit'> Save </button>
            </div>
          </div>
        </footer>
      </form>
      </div>
    );
  }
}

New.propTypes = {
  wine: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  regions: React.PropTypes.array.isRequired
};

New.contextTypes = {
  router: React.PropTypes.object.isRequired
};

