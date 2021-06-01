import _ from 'lodash';
import React, { Component ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/index"
import Header from "../header";
import Reload from "../Reload";


class PostList extends Component {

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
        <Link className="link-without-underline" to={`/commentnew/${post._id}`}> Comment </Link>
        <br />
        <Link className="link-without-underline" to={`/comments/${post._id}`}> View Comment </Link>
        {/* {this.renderTags(post.categories)} */}
        <hr />
      </div>
    );
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
        <Link className="btn btn-primary mb-5" to={'/postnew'}>Publish A New Post</Link>
        {_.map(this.props.posts, post => {
          return this.renderPostSummary(post);
        })}
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