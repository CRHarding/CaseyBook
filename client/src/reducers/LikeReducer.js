import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function likeReducer(state = initialState.likes, action) {
  switch (action.type) {
    case types.LOAD_LIKES_SUCCESS:
      return action.likes.data.data;
    case types.CREATE_LIKE_SUCCESS:
      return [
        ...state.filter(like => like.id !== action.like.data.like.id),
        Object.assign({}, action.like.data.like),
      ];
    case types.UPDATE_LIKE_SUCCESS:
      return [
        ...state.filter(like => like.id !== action.like.data.like.id),
        Object.assign({}, action.like.data.like),
      ];
  }
}
