import React, { Component } from "react";
import axios from 'axios';
import Welcome from "./Welcome"
export default class Header extends Component {

  constructor(props) {
    super(props)

    this.onChangedepartment = this.onChangedepartment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        department: ''
    }
}


onChangedepartment(e) {
  this.setState({department : e.target.value.toUpperCase() })
  console.log(this.state.department)
}



onSubmit(e) {
    e.preventDefault()

    const userObject = {
      department: this.state.department
  };

    console.log(this.state.department)

    axios.post('http://localhost:5000/find',{
              "department" : userObject.department
        })
        .then((res) => {
            res.send(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error)
        });


        this.setState({ department: ''})
  }
    

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
  <div class="container-fluid">
    <a href="/" class="navbar-brand">Connect</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/signin">SignUp</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">login</a>
        </li>
      </ul>
      </div>
    <form class="d-flex" onSubmit= {this.onSubmit}>
      <input class="form-control me-2" value={this.state.department} onChange={this.onChangedepartment} type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
    );
  }
}