// ** create-user.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';
import "./create-user.component.css"
// import ReactDOM from 'react-dom';
// import { GoogleLogin } from 'react-google-login';

// const express = require('express');
// const path = require('path');
// const app = express();

export default class CreateUser extends Component {


    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Email: '',
            Password: '',
            Emailerror:'',
            // PasswordError:''
        }
    }

    onChangeEmail(e) {
        this.setState({ Email: e.target.value })
        console.log(e.target.value);
    }

    onChangePassword(e) {
        this.setState({ Password: e.target.value })
    }

    validate = () => {
        // let Emailerror = "";
        // let Passworderror = "";

        if (!this.state.Email.includes("@uceou.edu")) {
            this.setState({
                Emailerror : "Confined to uceou.edu account holders"
            })
            return 0;  
        }
        else
            return 1;
    }
    onSubmit(e) {
        e.preventDefault()
        const isValid = this.validate();

        if(isValid) {
        const userObject = {
            Email: this.state.Email,
            Password: this.state.Password
        };


        axios.post('http://localhost:5000/find', {
            "Email":userObject.Email })
        .then((res) => {
            console.log(res.data.length)
            if(res.data.length > 0)
            {
                alert("You already have an account")
            }
            else if (res.data.length == 0)
            {
                console.log(userObject)
                axios.post('http://localhost:5000/create', userObject)
                .then((res) => {
                    // console.log();
                    console.log(res.data)
                }).catch((error) => {
                    console.log(error)
                });
            }
        }).catch((error) => {
            console.log(error)
        });

        this.setState({ Email: '', Password: '',Emailerror:'' })
    }
    }

    
      
    render() {
        return (
            <div className="wrapper">
                <div class ="box">
                <form onSubmit={this.onSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" value={this.state.Email} autoFocus = "1" placeholder = "@uceou.edu" onChange={this.onChangeEmail} className="form-control"class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {/* <div class="_9ay5"><i class="_9ay6 img sp_HDskLL-LmEK_1_5x sx_ee9706"></i></div>
                        <i class='fas fa-exclamation-triangle' style='font-size:48px;color:red'></i> */}
                        <div style={{ fontSize: 12, color: "red", fontVariantCaps :"titling-caps" ,fontFamily :"sans-serif" }}>
                            {this.state.Emailerror} 
                        </div>
                        
                            {/* <div class="box px">{this.state.Emailerror}</div> */}
                        
                        {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" value={this.state.Password} onChange={this.onChangePassword} className="form-control" class="form-control" id="exampleInputPassword1" />
                        </div>
                                <button type="submit" value="Create User" class="btn btn-primary">Submit</button>
                </form>
                </div>
                {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
                {/* <a href="#" class="g-signout" onclick="signOut()">Sign out</a> */}
                </div>
        )
    }

}