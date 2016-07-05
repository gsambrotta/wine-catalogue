/* global Filereader */
/* global FormData */

import React from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';

const apiServer = 'http://localhost:3000';
const api = 'http://localhost:3000/api';
const url = `${api}/images`;

export default class ImageUpload extends React.Component {
  constructor() {
    super();

    this.state = {
      uploaded: false,
      processing: false
    };

    bindAll(this, 'handleFile');
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    this.setState({
      processing: true
    });

    reader.onload = (upload) => {
      let formData = new FormData();
      formData.append('photo', file);

      const promise = $.ajax({
        url: url,
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        success: (filename) => {
          // const pathToPhoto = `${apiServer}/${filename}`; 

          this.setState({
            processing: false,
            uploaded: true,
            filename
          });

          this.props.onImageSave({
            profilePic: `${apiServer}/${this.state.filename}`
          });
        },
        error: function (xhr, status, err) {
          console.error(url, status, err.toString());
        }
      });
    };
    // read content of specific Blob once finished
    reader.readAsDataURL(file);
  }


  render() {
    let processing;
    let uploaded;

    if (this.state.uploaded) {
      uploaded = (
        <div id='status' className='image-uploaded'>
          <h3 className='image-uploaded__title'> Image uploaded successfully </h3>
          <img src={`${apiServer}/${this.state.filename}`} />
        </div>
      );
    }

    if (this.state.processing) {
      processing= 'Processing image, hang tight';
    }

    return (
      <div>
        <label> Upload the wine cover image here: </label>
          <input type='file' id='photo' name='photo' onChange={this.handleFile} />
          { uploaded }
      </div>
    );
  }
}

ImageUpload.PropTypes = { };
