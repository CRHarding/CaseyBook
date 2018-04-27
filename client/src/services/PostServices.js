import axios from 'axios';

class PostServices {
  requestHeaders() {
    return { AUTHORIZATION: `Bearer ${sessionStorage.jwt}` };
  }

  getAllPosts() {
    const headers = this.requestHeaders();
    return axios({
      method: 'GET',
      url: '/api/posts',
      headers: headers,
    })
      .then(posts => {
        return posts;
      })
      .catch(err => {
        return err;
      });
  }

  getAllUserPosts(user) {
    const headers = this.requestHeaders();
    return axios({
      method: 'GET',
      url: `/api/posts/${user.id}`,
      headers: headers,
    })
      .then(userPosts => {
        return userPosts;
      })
      .catch(err => {
        return err;
      });
  }

  createPost(post) {
    const headers = this.requestHeaders();
    return axios({
      method: 'POST',
      url: '/api/posts',
      headers: headers,
      data: {
        user_id: sessionStorage.user_id,
        friend_id: post.friend_id,
        content: post.content,
        rest: post.rest,
      },
    })
      .then(responsePost => {
        return responsePost;
      })
      .catch(err => {
        return err;
      });
  }

  updatePost(post) {
    const headers = this.requestHeaders();
    return axios({
      method: 'PUT',
      url: `/api/posts/${post.id}`,
      headers: headers,
      data: {
        user_id: sessionStorage.user_id,
        friend_id: post.friend_id,
        content: post.content,
        rest: post.rest,
      },
    })
      .then(responsePost => {
        return responsePost;
      })
      .catch(err => {
        return err;
      });
  }

  deletePost(id) {
    const headers = this.requestHeaders();
    return axios({
      method: 'DELETE',
      url: `api/comments/${id}`,
      headers: headers,
    })
      .then(deleteResponse => {
        return deleteResponse;
      })
      .catch(err => {
        return err;
      });
  }
}

export default PostServices();
