import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from "../../actions/index"
import Header from "../header";

class PostList extends Component {

  reload = () => {
    window.location.reload(false);
  }
  componentDidMount() {
    this.props.fetchPosts();
  }
  
  // componentDidUpdate() {
  //   this.reload()
  // }
  // renderTags(tags) {
  //   return tags.map(tag => {
  //     return <span className="badge badge-info span-with-margin" key={tag}>{tag}</span>;
  //   });
  // }

  renderPostSummary(post) {
    return (
      <div key={post._id}>
       
        <span className="span-with-margin text-grey"> • </span><br></br>
        {/* <span className="span-with-margin text-grey">{post.authorName}</span><br></br> */}
        <span className="span-with-margin text-grey"> • </span>
        {/* <span className="span-with-margin text-grey">{new Date(post.time).toLocaleString()}</span> */}
        <h3>
          <Link className="link-without-underline" to={`/posts/${post._id}`}>
            {post.title}
          </Link>
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </h3>
        {/* {this.renderTags(post.categories)} */}
        <hr />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
      <br></br>
      <br></br>
      <br></br>
      <div className="post">
        <Link className="btn btn-primary mb-5" to={'/postnew'}>Publish A New Post</Link>
        {_.map(this.props.posts, post => {
          return this.renderPostSummary(post);
        })}
      </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
    // window.location.reload(false);
    console.log(state)

  return { posts: state.posts };
}

export default connect(mapStateToProps , { fetchPosts })(PostList);