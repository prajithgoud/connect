// import React, { Component } from "react";
// import axios from 'axios';
// import Welcome from "./welcome"
// // import { link } from "node:fs";
// import "./destination/style.css";
// import { connect } from 'react-redux';

// export default class Header extends Component {

//   constructor(props) {
//     super(props)

//     this.onChangedepartment = this.onChangedepartment.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.state = {
//         department: ''
//     }
// }


// onChangedepartment(e) {
//   this.setState({department : e.target.value.toUpperCase() })
//   console.log(this.state.department)
// }



// onSubmit(e) {
//     e.preventDefault()

//     const userObject = {
//       department: this.state.department
//   };

//     console.log(this.state.department)

//     axios.post('http://localhost:5000/find',{
//               "department" : userObject.department
//         })
//         .then((res) => {
//             res.send(res.data);
//             console.log(res.data);
//         }).catch((error) => {
//             console.log(error)
//         });


//         this.setState({ department: ''})
//   }
    

//   render() {
//     return (
//       <nav class="navbar navbar-expand-lg flex-shrink-0  navbar-dark fixed-top bg-dark">
//   <div class="container-fluid flex-shrink-0 ">
//     <a href="/" class="navbar-brand">Connect</a>
//     <div class="navbar" id="navbarSupportedContent">
//       {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0"> */}
//       <ul class = "w-full block flex-grow sm:flex text-white sm:items-center sm:w-auto">
//       {/* <li class="nav-item"> */}
//       <li class = "text-sm sm:flex">
//           <a class="nav-link" aria-current="page" href="/signin">SignUp</a>
//         </li>
//         <li class="nav-item">
//           <a class="nav-link" href="/login">login</a>
//               {/* <a
//               href="#"
//               class="block mt-1 sm:inline-block sm:mt-0 text-white-700 hover:text-white mr-4"
//               >
//               Your Business
//               </a> */}
//          </li>
//        </ul>
//        </div>
//      <form class="d-flex" onSubmit= {this.onSubmit}>
//        <input class="form-control me-2" value={this.state.department} onChange={this.onChangedepartment} type="search" placeholder="Search" aria-label="Search" />
//        <button class="btn btn-outline-success" type="submit">Search</button>
//      </form>
//    </div>
//  </nav>
//     );
//   }
// }

import React, { Component ,useEffect} from "react";
import axios from 'axios';
import Welcome from "./welcome";
import { browserHistory } from 'react-router';
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import "./destination/style.css";
import { Link } from "react-router-dom";
import Reload from "./Reload";

let uname = ''


// function App() {
//   localStorage.removeItem('token')

//   const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;

//   useEffect(() => {
//     if(reloadCount < 1) {
//       sessionStorage.setItem('reloadCount', String(reloadCount + 1));
//       window.location.reload();
//     } else {
//       sessionStorage.removeItem('reloadCount');
//     }
//   }, []);
//   return (
//     <div>{ JSON.stringify({ reloadCount }) }</div>
//   );
// }
class Header extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
    this.signoutuser = this.signoutuser.bind(this);
  }
  

  // const uname = ''
  signoutuser () {
    localStorage.removeItem('token');
    window.location.reload(false);
  };

  componentDidMount()
  {
    // window.location.reload(false);
    if(this.props.authenticated)
    {
      console.log('true')
      const token = localStorage.getItem('token')
      const info = jwt.decode(token,process.env.JWT_SECRET)
      uname = info.uname;
    }
  }



renderLinks() {
  if (this.props.authenticated) {
    console.log('true')
    return (
      <div className="navbar-nav nav-item dropdown ml-auto">
  <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    
  </button>
  <ul class="dropdown-menu">
    {/* <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider" /></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li> */}
    <li><a class="dropdown-item" href="#">Your profile</a></li>
    <li><a class="dropdown-item" href="#">Settings</a></li>
    <li><hr class="dropdown-divider" /></li>
    <li><a class = "dropdown-item" ><button onClick = {this.signoutuser}> Sign out</button></a></li>
  </ul>
  {/* <Reload /> */}

</div>
    );
  } else {
    console.log("false")
    return (
      <ul className="navbar-nav">
        <li className="nav-item" key={1}>
          <Link className="btn btn-primary" to="/signin">
            Sign Up
          </Link>
        </li>
        <li className="nav-item" key={2}>
          <Link className="btn btn-secondary ml-sm-2" to="/login">
            Sign In
          </Link>
        </li>
      </ul>
    );
  }
}

render() {
  return (
    <nav class="navbar navbar-expand-lg flex-shrink-0  navbar-dark fixed-top bg-dark">
      <div className="container">
      <a href="/" class="navbar-brand">Connect</a>
        <div
          className="collapse navbar-collapse"
          id="navbarsExampleContainer"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-md-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search Post"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="ml-auto">{this.renderLinks()}</div>
        </div>
      </div>
    </nav>
  );
}
}

function mapStatetoProps(state) {
  // console.log(state);
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStatetoProps)(Header);
