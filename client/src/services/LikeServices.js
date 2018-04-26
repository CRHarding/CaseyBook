import axios from 'axios';

class LikeServices {
  requestHeaders() {
    return { AUTHORIZATION: `Bearer ${sessionStorage.jwt}` };
  }

  getLikes(id) {
    const headers = this.requestHeaders();
    return axios({
      method: 'GET',
      url: `/api/likes/${id}`,
      headers: headers,
    })
      .then(likes => {
        return likes;
      })
      .catch(err => {
        return err;
      });
  }

  createLike(post, bool) {
    const headers = this.requestHeaders();
    let up, down;
    if (bool === 'up') {
      up = true;
      down = false;
    } else {
      up = false;
      down = true;
    }
    return axios({
      method: 'POST',
      url: '/api/likes',
      headers: headers,
      dataL {
        id: sessionStorage.user_id,
        post: post,
        up: up,
        down: down,
      }
    })
      .then(responseLike => {
        return responseLike;
      })
      .catch(err => {
        return err;
      })
  }

  updateLike(post, bool) {
    const headers = this.requestHeaders();
    let up, down;
    if (bool === 'up') {
      up = true;
      down = false;
    } else {
      up = false;
      down = true;
    }
    return axios({
      method: 'POST',
      url: `/api/likes/${post.id}`,
      headers: headers,
      data: {
        id: sessionStorage.user_id,
        post: post,
        up: up,
        down: down,
      }
    })
  }
}

export default LikeServices();
