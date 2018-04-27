import LikeService from '../services/LikeServices';
import * as types from './actionTypes';

export function loadLikes() {
  return function(dispatch) {
    return LikeService.getLikes(id)
      .then(likes => {
        dispatch(loadLikesSuccess(likes));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function createLike(post, bool) {
  return function(dispatch) {
    return LikeService.createLike(post, bool)
      .then(like => {
        dispatch(createLikeSuccess(like));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function updateLike(post, bool) {
  return function(dispatch) {
    return LikeService.updateLike(post, bool)
      .then(like => {
        dispatch(updateLikeSuccess(like));
      })
      .catch(err => {
        throw err;
      });
  };
}

export function loadLikesSuccess(likes) {
  return { type: types.LOAD_LIKES_SUCCESS, likes };
}

export function createLikeSuccess(like) {
  return { type: types.CREATE_LIKE_SUCCESS, like };
}

export function updateLikeSuccess(like) {
  return { type: types.UPDATE_LIKE_SUCCESS, like };
}
