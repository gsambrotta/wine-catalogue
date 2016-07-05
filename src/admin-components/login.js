import React from 'react';
import $ from 'jquery';

const api = 'http://localhost:3000/api';

export default class Login extends React.Component {
  constructor(props) {
    super();

    this.state = {
      username: '',
      psw: ''
    };
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value
    });

  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `${api}/auth`;

    const id = Date.now();
    let username = this.state.username;
    let password = this.state.password;
    if (!id || !username || !password) {
      return;
    }

    const req = $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      date: {
        id,
        username,
        password
      }
    });

    req.done(() => {
      console.log('connect!');
    });

    req.fail((xhr, status, err) => {
      console.error(url, status, err.toString());
    });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' value={this.state.username} onChange={this.handleUsername.bind(this)}/>
        <input type='password' value={this.state.password} onChange={this.handlePassword.bind(this)}/>
        <button type='submit'> login </button>
      </form>
    );
  }
}

Login.propTypes = { };

