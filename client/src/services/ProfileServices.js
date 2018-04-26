import axios from 'axios';

class ProfileServices {
  getAllPosts() {
    return axios({
      method: 'GET',
      url: '/api/posts',
    })
      .then(posts => {
        return posts;
      })
      .catch(err => {
        return err;
      });
  }

  getAllFriends() {
    return axios({
      method: 'GET',
      url: '/api/friends',
    })
      .then(friends => {
        return friends;
      })
      .catch(err => {
        return err;
      });
  }

  getPendingFriends() {
    return axios({
      method: 'GET',
      url: '/api/pendingFriends',
    })
      .then(pendingFriends => {
        return pendingFriends;
      })
      .catch(err => {
        return err;
      });
  }

  createPost(post) {
    return axios({
      method: 'POST',
      url: '/api/comments',
      data: {
        userId: userId,
        friendId: friendId,
        content: content,
        rest: rest,
      },
    });
  }

  updatePost(post) {
    return axios({
      method: 'PUT',
      url: `/api/posts/${post.id}`,
      data: {
        postId: postId,
        content: content,
        rest: rest,
      },
    });
  }
}

export default ProfileServices();
