import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super();

    this.state = {
    	'username': '',
    	'psw': ''
    }
  }

  render() {
    return (
      <form>
	    	<input type='text' value={this.state.username}/>
	    	<input type='password' value={this.state.psw} />
	    	<button type='submit'> login </button>
	    </form>
    );
  }
}

Login.propTypes = { };

