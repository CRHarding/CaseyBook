import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function postReducer(state = initialState.posts, action) {
  switch(action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return action.posts.data.data;
    case types.LOAD_USER_POSTS_SUCCESS:
      return action.userposts.data.data;
    case: types.CREATE_POST_SUCCESS:
      return [
        ...state.filter(
          post => post.id !== action.post.data.post.id,
        ),
        Object.assign({}, action.post.data.post),
      ];
    case types.UPDATE_POST_SUCCESS:
      return [
        ...state.filter(
          post => post.id !== action.post.data.post.id,
        ),
        Object.assign({}, action.post.data.post),
      ];
    default:
      return state;
  }
}
