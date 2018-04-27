import axios from 'axios';

class FriendServices {
  requestHeaders() {
    return { AUTHORIZATION: `Bearer ${sessinoStorage.jwt}` };
  }

  getAllFriends() {
    const headers = this.requestHeaders();
    return axios({
      method: 'GET',
      url: '/api/friends',
      headers: headers,
    })
      .then(friends => {
        return friends;
      })
      .catch(err => {
        return err;
      });
  }

  getPendingFriends() {
    const headers = this.requestHeaders();
    return axios({
      method: 'GET',
      url: '/api/pendingfriends',
      headers: headers,
    })
      .then(pendingFriends => {
        return pendingFriends;
      })
      .catch(err => {
        return err;
      });
  }

  createFriendRequest(friend) {
    const headers = this.requestHeaders();
    return axios({
      method: 'POST',
      url: `/api/friends`,
      headers: headers,
      data: {
        user_id: sessionStorage.user_id,
        friend_id: friend.id,
        status: 3,
      },
    })
      .then(friends => {
        return friends;
      })
      .catch(err => {
        return err;
      });
  }

  updateFriendStatus(friend, status) {
    const headers = this.requestHeaders();
    return axios({
      method: 'PUT',
      url: `/api/friends/confirm`,
      headers: headers,
      data: {
        user_id: sessionStorage.user_id,
        friend_id: friend.id,
        status: status,
      },
    })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });
  }
}
