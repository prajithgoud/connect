// ** create-user.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';
import "./create-user.component.css"
// import ReactDOM from 'react-dom';
// import { GoogleLogin } from 'react-google-login';

export default class CreateUser extends Component {


    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Email: '',
            Password: ''
        }
    }

    onChangeEmail(e) {
        this.setState({ Email: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ Password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            Email: this.state.Email,
            Password: this.state.Password
        };


        axios.post('http://localhost:5000/find', userObject)
        .then((res) => {
            console.log(res.data.length)
            if(res.data.length > 0)
            {
                alert("the email is already used")
            }
            else if (res.data.length == 0)
            {
                console.log(userObject)
                axios.post('http://localhost:5000/create', userObject)
                .then((res) => {
                    console.log(res.data)
                }).catch((error) => {
                    console.log(error)
                });
            }
        }).catch((error) => {
            console.log(error)
        });

        this.setState({ Email: '', Password: '' })
    }

    

      

      
    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" value={this.state.Email} onChange={this.onChangeEmail} className="form-control"class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" value={this.state.Password} onChange={this.onChangePassword} className="form-control" class="form-control" id="exampleInputPassword1" />
                        </div>
                                <button type="submit" value="Create User" class="btn btn-primary">Submit</button>
                </form>
                {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
                {/* <a href="#" class="g-signout" onclick="signOut()">Sign out</a> */}
                </div>
        )
    }

}