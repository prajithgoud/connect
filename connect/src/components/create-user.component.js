

import React, { Component } from 'react';
import axios from 'axios';
import "./Signup.css";
import Header from "./header";
import {Helmet} from 'react-helmet';


// import ReactEncrypt from 'react-encrypt';

// import Bcrypt from "./bcrypt";

// const bcrypt = require('bcrypt');

export default class CreateUser extends Component {


    constructor(props) {
        super(props)

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeConfirm = this.onChangeConfirm.bind(this);
        this.onChangedepartment = this.onChangedepartment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.hola = this.hola.bind(this);
        this.state = {
            Email: '',
            Password: '',
            Emailerror:'',
            // PasswordError:''
            Name: '',
            Confirm: '',
            department: ''
        }
    }

    // componentDidMount () {
    //     const script = document.createElement("script");
    
    //     script.src = "./signupscriptjs.js";
    //     script.async = true;
    
    //     document.body.appendChild(script);
    // }

    onChangeEmail(e) {
        // document.getElementById("incorrect").style.display = "none";
        this.setState({ Email: e.target.value })
        // console.log(e.target.value);
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
    onChangedepartment(e) {
        this.setState({department : e.target.value.toUpperCase() })
    }
    onChangeName(e) {
        this.setState({ Name: e.target.value })
    }

    onChangeConfirm(e) {
        this.setState({ Confirm : e.target.value })
    }

    // resetForm(){

    //     this.setState({feedback: ''});
    // }
    // getComponent(e) {
    //     return <Bcrypt/>
    // }

    
    onSubmit(e) {
        e.preventDefault()
        const isValid = this.validate();
        if(isValid) {
        var userObject = {
            Email: this.state.Email,
            Password:this.state.Password,
            Name: this.state.Name,
            department: this.state.department
        };

        // const messageHtml =  renderEmail(
        //     // <MyEmail name={this.state.Name}> {this.state.feedback}</MyEmail>
        //     <MyEmail name={this.state.Name}> </MyEmail>
        //   );
        
        axios.post('http://localhost:5000/find', {
            "Email":userObject.Email })
        if(this.state.Password != this.state.Confirm)
        {
            document.getElementById("notmatch").style.display = "block";
        }
        else {
        document.getElementById("notmatch").style.display = "none";
        axios.post('http://localhost:5000/find',{
            "Email" : userObject.Email
        })
        .then((res) => {
            console.log(res.data.length)
            if(res.data.length > 0)
            {
                alert("You already have an account")
                document.getElementById("incorrect").style.display = "block";
            }
            else if (res.data.length == 0)
            {
                
                axios.post('http://localhost:5000/create', userObject)
                .then((res) => {
                    // console.log(res.msg);
                    axios({
                        method: "POST",
                        url:"http://localhost:5000/send",
                        data: {
                      name: userObject.Name,
                      email: userObject.Email,
                    //   messageHtml: messageHtml
                        }
                    }).then((response)=>{
                        if (response.data.msg === 'success'){
                            alert("Email sent, awesome!");
                            // this.resetForm()
                        }else if(response.data.msg === 'fail'){
                            alert("Oops, something went wrong. Try again")
                        }
                    })
                    console.log(res.data.Password)
                }).catch((error) => {
                    console.log(error)
                });
            }
        }).catch((error) => {
            console.log(error)
        });

        // this.setState({ Email: '', Password: '' })
        this.setState({ Email: '', Password: '',Emailerror:'', Name: '' ,Confirm: '',department: ''});

    }
    }
}

    
      
    render() {
        return (
            // <div className="wrapper">{/* <ReactEncrypt /> */}
            //     <div class ="box">
            //     <form onSubmit={this.onSubmit}>
            //         <div class="mb-3">
            //             <label for="exampleInputName1" class="form-label">Name</label>
            //             <input type="text" value={this.state.Name} onChange={this.onChangeName} className="form-control" class="form-control" id="exampleInputName1" />
            //         </div>
            //         <div class="mb-3">
            //             <label for="exampleInputEmail1" class="form-label">Email address</label>
            //             <input type="email" value={this.state.Email} autoFocus = "1" placeholder = "@uceou.edu" onChange={this.onChangeEmail} className="form-control"class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
            //             <div style={{ fontSize: 12, color: "red", fontVariantCaps :"titling-caps" ,fontFamily :"sans-serif" }}>
            //                 {this.state.Emailerror} 
            //             </div>
                        
            //                 {/* <div class="box px">{this.state.Emailerror}</div> */}
                        
            //             {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
            //             {/* <input type="email" value={this.state.Email} onChange={this.onChangeEmail} className="form-control"class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            //             <p id="incorrect" style={{display: "none"}}> The Email is already used </p> */}
            //         </div>
            //         <div class="mb-3">
            //             <label for="exampleInputDepartment1" class="form-label">Department</label>
            //             <input type="text" value={this.state.department} onChange={this.onChangedepartment} className="form-control" class="form-control" id="exampleInputdepartment1" />
            //         </div>
            //         <div class="mb-3">
            //             <label for="exampleInputPassword1" class="form-label">Password</label>
            //             <input type="password" value={this.state.Password} onChange={this.onChangePassword} className="form-control" class="form-control" id="exampleInputPassword1" />
            //         </div>
            //         <div class="mb-3">
            //             <label for="exampleInputConfirm1" class="form-label">ConfirmPassword</label>
            //             <input type="password" value={this.state.Confirm} onChange={this.onChangeConfirm} className="form-control" class="form-control" id="exampleInputConfirm1" />
            //             <p id="notmatch" style={{display: "none"}}> The Passwords does not Match </p>
            //         </div>
            //         <button type="submit" value="Create User" class="w-full bg-gray-800 hover:bg-grey-900 text-black text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10">Submit</button>
            //     </form>
            //     </div>
            //     {/* <div class="g-signin2" data-onsuccess="onSignIn"></div> */}
            //     {/* <a href="#" class="g-signout" onclick="signOut()">Sign out</a> */}
            //     </div>

           
            <div>
            <Header />
            <div class="form-container">
            
                
            <form onSubmit={this.onSubmit} id="form">
                <h3>Sign Up</h3>
                <div class="container">
                <span class="icon"><i class="fas fa-user"></i></span>
                <input type="text" value={this.state.Name} onChange={this.onChangeName} placeholder="username"/>
                </div>
                <div class="container">
                <span class="icon"><i class="fas fa-at"></i></span>
                <input type="email" value={this.state.Email} onChange={this.onChangeEmail} placeholder="email"/>
                <div style={{ fontSize: 12, color: "red", fontVariantCaps :"titling-caps" ,fontFamily :"sans-serif" }}>
                     {this.state.Emailerror} 
                </div>
                </div>
                <div class="container">
                <span class="icon"><i class="fas fa-lock"></i></span>
                <input type="password" value={this.state.Password} onChange={this.onChangePassword} placeholder="password"/>
                </div>
                <div class="container">
                <span class="icon"><i class="fas fa-lock"></i></span>
                <input type="password" value={this.state.Confirm} onChange={this.onChangeConfirm} placeholder="Confirm Password"/>
                <p id="notmatch" style={{display: "none"}}> The Passwords does not Match </p>
                </div>
                <input type="submit" value="Register" />
                
            </form>
            <Helmet>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
                <script>
                    {`
                        var form = document.getElementById('form'); 

                        form.addEventListener('mousemove', (e) =>{ 
                            var x = (window.innerWidth / 2 - e.pageX) / 12; 
                            var y = (window.innerHeight / 2 - e.pageY) / 12;
                            form.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
                    }); 
                    console.log("sai");
                    form.addEventListener('mouseleave', function(){
                            form.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    })
                    `}
                </script>
            </Helmet>
            </div>
            </div>
        )
    }

}
