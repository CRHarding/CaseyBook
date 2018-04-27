import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function friendReducer(state = initialState.friends, action) {
  switch (action.type) {
    case types.LOAD_FRIENDS_SUCCESS:
      return action.friends.data.data;
    case types.LOAD_PENDING_FRIENDS_SUCCESS:
      return action.pendingfriends.data.data;
    case types.CREATE_FRIEND_REQUEST_SUCCESS:
      return [
        ...state.filter(friend => friend.id !== action.friend.data.friend.id),
        Object.assign({}, action.friend.data.friend),
      ];
    case UPDATE_FRIEND_STATUS_SUCCESS:
      return [
        ...state.filter(friend => friend.id !== action.friend.data.friend.id),
        Object.assign({}, action.friend.data.friend),
      ];
    default:
      return state;
  }
}
