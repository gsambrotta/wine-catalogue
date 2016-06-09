import React from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';

export default class ImageUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      dataUri: null,
      processing: false
    };

    bindAll(this, 'handleFile', 'handleSubmit');
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        dataUri: upload.target.result,
        filename: file.name,
        filetype: file.type
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
      url: 'api/v1/image',
      type: 'POST',
      dataType: 'json',
      data: {
        dataUri: this.state.dataUri,
        filename: this.state.filename,
        filetype: this.state.filetype
      }
    });

    promise.done(data => {
      self.setState({
        processing: false,
        uploaded_uri: data.uri
      });
    });
  }

  render() {
    let processing;
    let uploaded;

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h3> Image uploaded! </h3>
          <img src={this.state.uploaded_uri}/>
          <pre>{this.state.uploaded_uri}</pre>
        </div>
      );
    }

    if (this.state.processing) {
      processing= 'Processing image, hang tight';
    }

    return (
      <div>
        <label> Upload an image </label>
        <form onSubmit={this.handleSubmit} encTYpe='multipart/form-data'>
          <input type='file' onChange={this.handleFile} />
          <input type='submit' value='Update' disable={this.state.processing} />
        </form>
        {uploaded}
      </div>
    );
  }
}

ImageUpload.PropTypes = { };
