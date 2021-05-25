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

  return { posts: state.posts };
}

export default connect(mapStateToProps , { fetchPosts })(PostList);