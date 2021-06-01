import './App.css';

import React , {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import axios from 'axios';

import Header from "./components/header"
import CreateUser from "./components/create-user.component";
import Users from "./components/users.component";
import dataTable from "./components/data-table"
import Login from "./components/login"
import Checkout from "./components/checkotp";
import Welcome from "./components/welcome";
import PostList from "./components/posts/posts_list";
import Postnew from "./components/posts/posts_new";
import CommentNew from "./components/posts/posts_detail/comment_new";
import Comments from "./components/posts/posts_detail/comments";
import reducers from "./reducers/root_reducer";
import { AUTH_USER } from "./actions/types";
import Pageloader from './components/PageLoader';
import Signupsuccess from './components/Signupsuccess';
// import { Token } from '../server/server';

// import Cookies from 'js-cookie';
// import  { Cookies } from 'react-cookie';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// cookies.set('jwt','token',{path : '/'});

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem("token");
// const token = cookies.get('jwt');

if (token !== null) {
  console.log(token);
  axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${token}` } })
    .then((res) => {
      if (res.data === true) {
        store.dispatch({ type: AUTH_USER })
      }
    })
    .catch((error) => {
      console.log(error.response.data)
    });
}
else{
  console.log(token + "  po");
  console.log("bekaar");
}

function App() {

  return (
    <Provider store={store} >
      <Router>
        <div>
          <Header />
          <div>
            <Route exact path="/" component={Welcome} />
          </div>
          <div clasname="container" id="content">
            <switch>
              <Route exact path="/" component={Welcome} />
              <Route path="/signin" component={CreateUser} />
              <Route path="/login" component={Login} />
              <Route path="/users" component={Users} />
              <Route path="/datatable" component={dataTable} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/posts" component={PostList} />
              <Route path="/postnew" component={Postnew} />
              <Route path="/commentnew/:id" component={CommentNew} />
              <Route path="/comments/:id" component={Comments} />
              <Pageloader />
              <Signupsuccess />
            </switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App;