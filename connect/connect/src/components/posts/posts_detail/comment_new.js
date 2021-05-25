import React, { Component } from 'react';
import axios from 'axios';
// import Header from "../header";
import Helmet from 'react-helmet';
import { connect } from "react-redux";

class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.onChangecontent = this.onChangecontent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            content: ''
        }
    }

    onChangecontent(e) {
        this.setState({ content: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        // console.log(this.state.title,this.state.categories,this.state.content)

        const token = localStorage.getItem('token')
        
        const formdet = {
            postId: this.props.match.params.id,
            content: this.state.content,
            token: token
        }

        console.log(formdet)

        // axios.post('http://localhost:5000/api/createcomment', formdet,{
        //     headers: { "Authorization": `Bearer ${token}` }
        // }).then(res => {
        //     console.log(res.data);
        // }).catch(error => {
        //     console.log(error.response.data);
        // })
        axios.get('http://localhost:5000/token', { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res) => {
            console.log(res.data);
            if(res.data === true){
                console.log("inside if");
                axios.post('http://localhost:5000/api/createcomment',formdet)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
            }
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }
    render() {
        return (
            <div>
                {/* <Header /> */}
                <br />
                <br />
                <div class="form-container">
                    <form onSubmit={this.onSubmit} id="form">
                        <h3>Comment</h3>
                        <div class="container">
                            {/* <span class="icon"><i class="fas fa-lock"></i></span> */}
                            <input type="text" value={this.state.content} onChange={this.onChangecontent} placeholder="content" />
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default (CreateUser);