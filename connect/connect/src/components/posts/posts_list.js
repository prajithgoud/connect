import _ from 'lodash';
import React, { Component ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/index"
import Header from "../header";
import Reload from "../Reload";
import Comments from "./posts_detail/comments"
import Commentnew from "./posts_detail/comment_new"
import Helmet from 'react-helmet';
import jwt from "jsonwebtoken";
import axios from 'axios';

class PostList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verified: '',
      signedin: ''
    }
    this.decide = this.decide.bind(this);
  }


  componentDidMount() {
    this.props.fetchPosts();
  }
  
  renderTags(tags) {
    return tags.map(tag => {
      return <span className="" key={tag}>{tag}</span>;
    });
  }

  renderPostSummary(post) {
    return (
      <div key={post._id}>
        <span>Title: {post.title}</span><br />
        <span className="span-with-margin text-grey"> • </span><br></br>
        <span className="span-with-margin text-grey">Author : {post.authorName}</span><br></br>
        <span className="span-with-margin text-grey"> • </span>
        <span className="span-with-margin text-grey">{new Date(post.time).toLocaleString()}</span>
        <h3>
          {/* <Link className="link-without-underline" to={`/posts/${post._id}`}>
            {post.title}
          </Link> */}
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </h3>
        <br />
        {/* <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link>
        <br />
        <Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link> */}
        {this.state.signedin === true && <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link>}
        <br />
        {<Link className="link-without-underline" to={`/comments/${post._id}`}> View Comments </Link>}
        {/* {this.renderTags(post.categories)} */}
        <hr />
      </div>
    );
  }
  decide() {
    axios.get('http://localhost:5000/token', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
      .then((res) => {
        if (res.data === true) {
          this.setState({
            signedin : true
          })
        }
      })
      .catch((error) => {
        console.log(error)
      });

    if(this.state.signedin === true) {
      axios.get('http://localhost:5000/userdetails', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
              if (res.data.isverified === "true") {
                this.setState({
                  verified : true
                })
              }
            })
        }
    }

    
  render() {
    // this.reload();
      return (
        <div>
          <Header />
          <Reload />
        <br></br>
        <br></br>
        <br></br>
        <div className="post">
        {this.decide()}
          { this.state.verified === true && <Link className="btn btn-primary mb-5" to={'/postnew'}>Publish A New Post</Link> }
          {_.map(this.props.posts, post => {
            return this.renderPostSummary(post);
          })}
          {/* <Link className="btn btn-primary mb-5" to={'/postnew'}>Publish A New Post</Link>
          {_.map(this.props.posts, post => {
            return this.renderPostSummary(post);
          })} */}
        {/* {this.reload()} */}
        {/* <button onClick = {this.reload}>Click me</button> */}
        </div>
        </div>
      );
    
  }
}



function mapStateToProps(state) {
    // window.location.reload(false);
    console.log(state)

  return {
    authenticated: state.auth.authenticated, 
    posts: state.posts 
  };
}

export default connect(mapStateToProps , { fetchPosts })(PostList);

// import _ from 'lodash';
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { fetchPosts } from "../../actions/index"
// import { Redirect } from 'react-router-dom';
// import Header from "../header"
// import Comments from "./posts_detail/comments"
// import Commentnew from "./posts_detail/comment_new"
// import Reload from "../Reload";

// class PostList extends Component {

//   componentDidMount() {
//     this.props.fetchPosts();
//   }

//   renderTags(tags) {
//     return tags.map(tag => {
//       return <span className="" key={tag}>{tag}</span>;
//     });
//   }


//   renderPostSummary(post) {
//     return (
//       <div key={post._id}>

//         {/* {this.renderTags(post.categories)} */}
//         <span className="span-with-margin text-grey"> • </span>
//         <span className="span-with-margin text-grey">Author: {post.authorName}</span>
//         <span className="span-with-margin text-grey"> • </span>
//         <span className="span-with-margin text-grey">{new Date(post.time).toLocaleString()}</span>
//         <h3>
//           {/* <Link className="link-without-underline" to={`/posts/${post._id}`}>
//             {post.title}
//           </Link> */}
//           <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
//         </h3>
//         {/* <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link> */}
//         <Commentnew id={post._id} />

//         <Comments id={post._id} />
//         <hr />
//       </div>
//     );
//   }

//   render() {
//     return (
//       <div className="post">
//         <Header />
//         <Reload />
//        <br></br>
//        <br></br>
//        <br></br>
//         {/* <Header /> */}
//         <Link className="btn btn-primary mb-5" to={'/postnew'}>Publish A New Post</Link>
//         {_.map(this.props.posts, post => {
//           return this.renderPostSummary(post);
//         })}
//       </div>
//     );
//   }
// }



// function mapStateToProps(state) {
//   console.log(state)
//   return {
//     authenticated: state.auth.authenticated,
//     posts: state.posts
//   };
// }

// export default connect(mapStateToProps, { fetchPosts })(PostList)