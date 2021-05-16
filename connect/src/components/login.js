// login.js
/* global gapi */
import React, { Component } from 'react';
import axios from 'axios';
import "./Loginstyle.css"
import Header from "./header";
export default class CreateUser extends Component {


    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Email: '',
            Password: '',
            isSignedin: false
        }
    }


    // onSignIn(googleUser) {
    //     console.log("hi");
    //     var profile = googleUser.getBasicProfile();
    //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //     console.log('Name: ' + profile.getName());
    //     console.log('Image URL: ' + profile.getImageUrl());
    //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //   }
      

    //   getContent() {
    //     if (this.state.isSignedIn) {
    //       return <p>hello user, you're signed in </p>
    //     } else {
    //       return (
    //         <div>
    //           {/* <p>You are not signed in. Click here to sign in.</p> */}
    //           <button id="loginButton">Login with Google</button>
    //         </div>
    //       )
    //     }
        
    //   }

    //   onSuccess() {
    //     this.setState({
    //       isSignedIn: true
    //     })
    //   }


    
  

    //   componentDidMount() {
    //     window.gapi.load('auth2', () => {
    //       this.auth2 = gapi.auth2.init({
    //         client_id: '50791853619-pa8fvmnf8nqgi83ntvnh5r70v06au054.apps.googleusercontent.com',
    //       })
    //     })
    //   }

//     signOut() {
//     console.log('hi')
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }

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
        
        axios.post('http://localhost:5000/find',{
            "Email": userObject.Email,
        })
        .then((res) => {
            if(res.data.length === 0 )
            {
                document.getElementById("incorrect").style.display = "block";
            }
            else
            {
                const userdet = {
                    enterpass : userObject.Password,
                    retpass : res.data[0].Password,
                    email : userObject.Email
                };
                axios.post('http://localhost:5000/login',userdet)
                .then((res) => {
                    console.log(res.data.token);
                    const Token = "Bearer " + res.data.token;
                    console.log("client");
                    const id = {
                        Authorization : Token
                    }
                    axios.post('http://localhost:5000',id)
                    .then((response) => {
                        console.log(response);
                    })
                    // console.log(res.data.token);
                    // console.log("hi");
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }).catch((error) => {
            console.log(error)
        });

        this.setState({ Email: '', Password: '' })
    }
      
    render() {
        return (
            // <div className="wrapper">
            //     <form onSubmit={this.onSubmit}>
            //         <div class="mb-3">
            //             <label for="exampleInputEmail1" class="form-label">Email address</label>
            //             <input type="email" value={this.state.Email} onChange={this.onChangeEmail} className="form-control"class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            //             {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
            //         </div>
            //             <div class="mb-3">
            //                 <label for="exampleInputPassword1" class="form-label">Password</label>
            //                 <input type="password" value={this.state.Password} onChange={this.onChangePassword} className="form-control" class="form-control" id="exampleInputPassword1" />
            //             </div>

            //         <div>
            //             <p id="incorrect" style={{display: "none"}}> The details entered are incorrect </p>
            //         </div>
            //                     <button type="submit" value="Create User" class="btn btn-primary">Submit</button>
            //     </form>


            //     {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}

            //     {/* {this.getContent()} */}
            //     </div>
            <div>
                <Header />
                <br />
                <br />
            <div class="login-div">
                
                <form onSubmit={this.onSubmit}>
                <div class="logo"></div>
                <div class="title">Sign In</div> <div class="sub-title">Use your college mail </div>
                <div class="fields">
                    <div class="username">
                        <input type="username" value={this.state.Email} onChange={this.onChangeEmail} class="user-input" placeholder="email" />
                        
                    </div>
                    <div class="password" >
                         <input type="password" value={this.state.Password} onChange={this.onChangePassword}class="pass-input" placeholder="password" />
                    </div>
                </div>
                <div>
                   <p id="incorrect" style={{display: "none"}}> The details entered are incorrect </p>
                </div>
            <button class="signin-button">Login</button>
            <div class="link">
                <a href="#">Forgot password?</a> or <a href="#">Sign up</a>
            </div>
            </form>
            </div>
            </div>
        )
    }
}