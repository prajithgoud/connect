  
import axios from 'axios';
import {
  AUTH_USER,
  FETCH_POSTS
} from './types';

export function fetchPosts() {

  return function(dispatch) {
    axios.get('/posts')
    .then((response) => {
      dispatch({
        type: FETCH_POSTS,
        payload: response.data,
      });
    });
  }
}