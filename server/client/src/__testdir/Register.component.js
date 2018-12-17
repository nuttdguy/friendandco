import React, { Component } from 'react';
import axios from 'axios';


class RegisterComponent extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }

        axios.post('api/user/register', user)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => console.log(error, 'could not save user'));
    }

    onChange(e) {

        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    

    render() {

        return (
            <form onSubmit={this.onSubmit} >
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                    type="text" 
                    name='username' 
                    placeholder='username'
                    onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                    type="text" 
                    name='firstName' 
                    placeholder='firstName'
                    onChange={this.onChange}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                    type="text" 
                    name='lastName' 
                    placeholder='lastName'
                    onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    name='email' 
                    placeholder='email' 
                    onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name='password' 
                    placeholder='password'
                    onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <input 
                    type="password" 
                    name='passwordConfirm' 
                    placeholder='Confirm password'
                    onChange={this.onChange} />
                </div>
                <div>
                    <button type='submit' >Submit</button>
                </div>
            </form>
        )
    }

}

export default RegisterComponent;