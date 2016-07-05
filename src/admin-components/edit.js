import React from 'react';
import $ from 'jquery';

import ImageUpload from './common/imageUpload.js';


export default class Edit extends React.Component {
  constructor(props) {
    super();

    this.state = {
      title: props.wine.title,
      description: props.wine.description,
      producer: props.wine.producer,
      category: props.wine.category,
      region: props.wine.region
    };
  }

  showCategoryTag() {
    const cat = this.props.categories.map(category => {
      if (category.name === this.props.wine.category && !($('.tags button').hasClass('selected-tag'))) {
        $(`.${category.name}`).addClass('selected-tag');
      }
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

  handleEditTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleEditDesc(e) {
    this.setState({
      description: e.target.value
    });
  }

  handleEditProducer(e) {
    this.setState({
      producer: e.target.value
    });
  }

  handleEditRegion(e) {
    this.setState({
      region: e.target.value
    });
  }

  handleReset(evt) {
    evt.preventDefault();

    this.setState({
      title: this.props.wine.title,
      description: this.props.wine.description,
      producer: this.props.wine.producer,
      category: this.props.wine.category,
      region: this.props.wine.region
    });

  }

  onImageSave(profilePic) {
    console.log(profilePic);
    this.setState({
      profilePic: profilePic.profilePic
    }) 
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let thumb = this.state.profilePic;
    let producer = this.state.producer.trim();
    let category = this.state.category;
    let region = this.state.region;
    if (!title || !description || !producer || !category || !region || !thumb) {
      return;
    }

    this.props.onEditSave({
      id: this.props.wine.id,
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
      <div className='form-entry edit-comp'>
      
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
            <label> Update here the title of your wine: </label>
            <input type='text' className='input-title' value={this.state.title} onChange={this.handleEditTitle.bind(this)}/>
          </div>

          <div className='form-group'>
            <label> Update here the wine description: </label>
            <textarea rows='4' cols='50' value={this.state.description} onChange={this.handleEditDesc.bind(this)}></textarea>
          </div>

          <div className='form-group'>
            <label> Update here the producer information: </label>
            <textarea rows='4' cols='50' value={this.state.producer} onChange={this.handleEditProducer.bind(this)}></textarea>
          </div>

          <div className='form-group dropdown-group'>
            <label> Choose the region here: </label>
            <select value={this.state.region} onChange={this.handleEditRegion.bind(this)}>
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
            <div className='btn reset btn-inline'>
              <button onClick={this.handleReset.bind(this)}> Reset </button>
            </div>

            <div className='btn save btn-inline'>
              <button type='submit'> Save </button>
            </div>
          </div>
        </footer>
      </form>
      </div>
    );
  }
}

Edit.propTypes = {
  wine: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  regions: React.PropTypes.array.isRequired
  // onEditSave: React.propTypes.function.isRequired
};

Edit.contextTypes = {
  router: React.PropTypes.object.isRequired
};

