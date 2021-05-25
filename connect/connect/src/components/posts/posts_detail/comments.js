import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../../../actions';

class Comments extends Component {

  componentDidMount() {
    // console.log(this.props.match.params.id);
  this.props.fetchComments(this.props.match.params.id);
  }

  renderComment(comment) {
    return (
      <div key={comment._id}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-justify" dangerouslySetInnerHTML={{ __html: comment.content }} />
        <div>
          <span className="span-with-margin f6 text-grey">{comment.authorName}</span>
          <span className="span-with-margin f6 text-grey"> • </span>
          <span className="span-with-margin f6 text-grey">{new Date(comment.time).toLocaleString()}</span>
        </div>
        <hr />
      </div>
    );
  }

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h3 className="mt-5 mb-4">Comments</h3>
        {_.map(this.props.comments, comment => {
          return this.renderComment(comment);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { comments: state.comments };
}

export default connect(mapStateToProps, { fetchComments })(Comments);