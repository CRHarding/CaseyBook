import FriendService from '../services/FriendServices';
impoft * as types from './actionTypes';

export function loadFriends() {
  return function(dispatch) {
    return FriendService.getAllFriends()
      .then(friends => {
        dispatch(loadFriendsSuccess(friends));
      })
      .catch(err => {
        throw err;
      })
  }
}

export function loadPendingFriends() {
  return function(dispatch) {
    return FriendService.getPendingFriends()
      .then(pendingFriends => {
        dispatch(loadPendingFriendsSuccess(pendingFriends));
      })
      .catch(err => {
        throw err;
      })
  }
}

export function createFriendRequest() {
  return function(dispatch) {
    return FriendService.createFriendRequest(friend)
      .then(request => {
        dispatch(createFriendRequestSuccess(request));
      })
      .catch(err => {
        throw err;
      })
  }
}

export function updateFriendStatus() {
  return function(dispatch) {
    return FriendService.updateFriendStatus(friend, status)
      .then(friendResponse => {
        dispatch(updateFriendStatusSuccess(friendResponse));
      })
      .catch(err => {
        throw err;
      })
  }
}

export function loadFriendsSuccess(friends) {
  return { type: types.LOAD_FRIENDS_SUCCESS, friends };
}

export function loadPendingFriendsSuccess(pendingFriends) {
  return { type: types.LOAD_PENDING_FRIENDS_SUCCESS, pendingFriends }
}

export function createFriendRequestSuccess(request) {
  return { type: types.CREATE_FRIEND_REQUEST_SUCCESS, request }
}

export function updateFriendStatusSuccess(friendResponse) {
  return { type: types.UPDATE_FRIEND_STATUS_SUCCESS, friendResponse }
}
