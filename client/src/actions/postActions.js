import PostService from '../services/PostServices';
import * as types from './actiontypes';

export function loadPosts() {
  return function(dispatch) {
    return PostService.getAllPosts()
      .then(posts => {
        dispatch(loadPostsSuccess(posts));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function loadUserPosts(user) {
  return function(dispatch) {
    return PostService.getAllUserPosts(user)
      .then(posts => {
        dispatch(loadUserPostsSuccess(posts));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function createPost(post) {
  return function(dispatch) {
    PostService.createPost(post)
      .then(returnPost => {
        dispatch(createPostSuccess(returnPost));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function updatePost(post) {
  return function(dispatch) {
    PostService.updatePost(post)
      .then(returnPost => {
        dispatch(updatePostSuccess(post));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function deletePost(id) {
  return function(dispatch) {
    PostService.deletePost(id)
      .then(() => {
        dispatch(deletePostSuccess());
      })
      .catch(err => {
        throw err;
      });
  };
}

export function loadPostsSuccess(posts) {
  return { type: types.LOAD_POSTS_SUCCESS, posts };
}

export function loadUserPostsSuccess(posts) {
  return { type: types.LOAD_USER_POSTS_SUCCESS, posts };
}

export function createPostSuccess(post) {
  return { type: types.CREATE_POST_SUCCESS, post };
}

export function updatePostSuccess(post) {
  return { type: types.UPDATE_POST_SUCCESS, post };
}

export function deletePostSuccess() {
  return { type: types.DELETE_POST_SUCCESS };
}
