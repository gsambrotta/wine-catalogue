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
      data: {
        id,
        username,
        password
      }
    });

    req.done((result) => {
      // console.log('connect!', result);
      localStorage.setItem('token', result.token);
      localStorage.setItem('expires', result.expires);
      this.props.history.push('/admin');
    });

    req.fail((xhr, status, err) => {
      console.error(url, status, err.toString());
    });

  }

  render() {
    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
          <img src='/static/img/vegan-logo.png' alt='wine age logo' className='logo' />
          <div className="form-group">
            <input type='text' value={this.state.username} placeholder='username' onChange={this.handleUsername.bind(this)}/>
          </div>
          <div className="form-group">
            <input type='password' value={this.state.password} placeholder='password' onChange={this.handlePassword.bind(this)}/>
          </div>
          <div className='btn login-btn push-right'>
            <button type='submit'> login </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = { };

