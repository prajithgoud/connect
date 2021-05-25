import axios from 'axios';
import {
  AUTH_USER,
  FETCH_POSTS,
  CREATE_POST
} from './types';

export function fetchPosts() {
  return function(dispatch) {
    axios.get('http://localhost:5000/api/post/')
    .then((res) => {
      dispatch({
        type: FETCH_POSTS,
        payload: res.data,
      });
    });
  }
}

export const showLoader = () => dispatch => {
  dispatch({
    type:"SHOW_LOADER"
  })
}

export const hideLoader = () => dispatch => {
  dispatch({
    type:"HIDE_LOADER"
  })
}

export const showaccountCreated = () => dispatch => {
  dispatch({
    type:"SHOW_ACCOUNT_CREATED"
  })
}

export const hideaccountCreated = () => dispatch => {
  dispatch({
    type:"HIDE_ACCOUNT_CREATED"
  })
}
// export function createPost({ title, categories, content }, historyPush, historyReplace) {

//   return function(dispatch) {
//     axios.post('http://localhost:5000/api/createpost/', {
//       title,
//       categories,
//       content,
//     }, {
//       headers: {authorization: localStorage.getItem('token')},  // require auth
//     })
//       .then((response) => {  // If create post succeed, navigate to the post detail page
//         dispatch({
//           type: CREATE_POST,
//           payload: response.data,
//         });
//       })
//       .catch((response) => {  // If create post failed, alert failure message
//         historyReplace('/postnew', {
//           time: new Date().toLocaleString(),
//           // message: response.data.message,
//         });
//       });
//   }
// }