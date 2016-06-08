import React from 'react';
import $ from 'jquery';


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

    console.log($('.selected-tag').text());
    this.setState({
      category: $('.selected-tag').text()
    })
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
    })

  }

  handleSubmit(evt) {
    evt.preventDefault();

    let title = this.state.title.trim();
    let description = this.state.description.trim();
    let producer = this.state.producer.trim();
    let category = this.state.category;
    let region = this.state.region;
    if(!title || !description || !producer || !category || !region) {
      return;
    }

    this.props.onEditSave({
      id: this.props.wine.id,
      title,
      description,
      producer,
      category,
      region
    });
  }

  render() {
    // console.log(this.props);

    return (
      <form className='edit-comp' onSubmit={this.handleSubmit.bind(this)}>
        <header>
          <div className='smallLink' onClick={this.context.router.goBack}>
            <i className='fa fa-long-arrow-left' aria-hidden='true'></i> back
          </div>
        </header>

        <main>
          <div className='form-group'>
            Image upload
          </div>

          <div className='form-group'>
            <input type='text' value={this.state.title} onChange={this.handleEditTitle.bind(this)}/>
          </div>

          <div className='form-group'>
            <textarea rows='4' cols='50' value={this.state.description} onChange={this.handleEditDesc.bind(this)}></textarea>
          </div>

          <div className='form-group'>
            <textarea rows='4' cols='50' value={this.state.producer} onChange={this.handleEditProducer.bind(this)}></textarea>
          </div>

          <div className='form-group'>
            Image upload Big Picture
          </div>

          <div className='form-group'>
            <select value={this.state.region} onChange={this.handleEditRegion.bind(this)}>
              {this.showRegionSelect()}
            </select>
          </div>

          <div className='form-group tags'>
            {this.showCategoryTag()}
          </div>

        </main>

        <footer>
          <div className='smallLink' onClick={this.context.router.goBack}>
            <i className='fa fa-long-arrow-left' aria-hidden='true'></i> back (did you save?)
          </div>

          <div className='reset'>
            <button onClick={this.handleReset.bind(this)}> Cancel Edit </button>
          </div>

          <div className='save'>
            <button> Save </button>
          </div>
        </footer>
      </form>
    );
  }
}

Edit.propTypes = {
  wine: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired,
  regions: React.PropTypes.array.isRequired
};

Edit.contextTypes = {
  router: React.PropTypes.object.isRequired
};

