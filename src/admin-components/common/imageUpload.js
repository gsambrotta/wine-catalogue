import React from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';

const api = 'http://localhost:3000/api';
const url = `${api}/images`;

export default class ImageUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      uploaded: false,
      processing: false
    };

    bindAll(this, 'handleFile', 'handleSubmit');
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    const target = e.target;

    reader.onload = (upload) => {
      this.setState({
        // dataUri: upload.target.result,
        filename: file.name,
        // filetype: file.type
        fieldName: $(target).attr('name') //userPhoto
      });
    };
    // read content of specific Blob once finished
    reader.readAsDataURL(file);
  }


  handleSubmit(e) {
    e.preventDefault();
    const self = this;

    this.setState({
      processing: true
    });

    const promise = $.ajax({
      url: url,
      type: 'POST',
      data: {
        // dataUri: this.state.dataUri,
        filename: this.state.filename,
        fieldName: this.state.fieldName
        // filetype: this.state.filetype
      },
      success: function (data) {
        console.log('success!')
      },
      error: function (xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });

    promise.done(data => {
      self.setState({
        processing: false,
        uploaded: true
      });
    });
  }

  render() {
    let processing;
    let uploaded;

    if (this.state.uploaded) {
      uploaded = (
        <div id='status'>
          <h3> Image uploaded! </h3>
          <img src='file/path'/> 
          <pre> file/path </pre>
        </div>
      );
    }

    if (this.state.processing) {
      processing= 'Processing image, hang tight';
    }

    return (
      <div>
        <label> Upload an image </label>
        <form onSubmit={this.handleSubmit} encType='multipart/form-data' id='uploadForm'>
          <input type='file' id={this.props.id} name='userPhoto' onChange={this.handleFile} />
          <input type='submit' value='Upload Image' name='submit' disable={this.state.processing} />
        </form>
        {uploaded}
      </div>
    );
  }
}

ImageUpload.PropTypes = { };
