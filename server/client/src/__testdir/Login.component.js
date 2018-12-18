import React, { Component } from 'react';
import axios from 'axios';

class LoginComponent extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const {username, password} = e.target;

    axios.post('api/auth/user/login', {
        username: username.value, password: password.value})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err, 'user not found'));

  }

  render() {

    return (
      <form onSubmit={this.onSubmitHandler}>
        <div>
        <label htmlFor="username" >username</label>
        <input 
          type="text" 
          name="username" />
        </div>
        <div>
        <label htmlFor="password">password</label>
        <input 
          type="text"
          name="password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default LoginComponent;