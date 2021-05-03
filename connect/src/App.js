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
import Welcome from "./components/Welcome";

function App() {
  return (<Router>
    <div className="App">
     
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
            <Route exact path="/" component={Welcome} />
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
