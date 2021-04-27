// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import CreateUser from "./components/create-user.component";
import Users from "./components/users.component";
import dataTable from "./components/data-table"
import Login from "./components/login"
import "./App.css"
// import "../server/routes/user.routes"

function App() {
  return (<Router>
    <div className="App">
      {/* <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">React Axios Tutorial</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/create-user"}>Create User</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/users"}>Users List</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header> */}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route path="/signin" component={CreateUser} />
              <Route path="/login" component={Login} />
              <Route path="/users" component={Users} />
              <Route path="/datatable" component={dataTable} />
              {/* <Route path="/Login" component={Login} /> */}
            </Switch>
          </div>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;
