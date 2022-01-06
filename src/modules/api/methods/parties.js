export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('parties', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`parties/${id}`)
  },
  create(payload) {
    return axios.post('parties', payload)
  },
  rating(id, payload) {
    return axios.post(`parties/${id}/rate`, payload)
  },
  comment(id, payload) {
    return axios.post(`parties/${id}/comment`, payload, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },
  attachments(page = 1, filter = {}) {
    return axios.get('parties/attachments', {
      params: {page: page, ...filter}
    });
  },
  toggleFavorite(id) {
    return axios.post(`parties/${id}/favorite`)
  },
  removeFavorite(id) {
    return axios.delete(`parties/${id}/remove-favorite`)
  },

  favorites() {
    return axios.get('profile/parties/favorites')
  },
  comments() {
    return axios.get('profile/parties/comments')
  },
  stats() {
    return axios.get('profile/parties/stats')
  }
});