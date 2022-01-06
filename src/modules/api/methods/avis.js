export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('avis', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`avis/${id}`)
  },
  create(payload) {
    return axios.post('avis', payload)
  },
  rating(id, payload) {
    return axios.post(`avis/${id}/rate`, payload)
  },
  comment(id, payload) {
    return axios.post(`avis/${id}/comment`, payload, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },
  attachments(page = 1, filter = {}) {
    return axios.get('avis/attachments', {
      params: {page: page, ...filter}
    });
  },
  toggleFavorite(id) {
    return axios.post(`avis/${id}/favorite`)
  },
  removeFavorite(id) {
    return axios.delete(`avis/${id}/remove-favorite`)
  },
  fetchInterviews() {
    return axios.get('avis/interviews')
  },
  getInterview(id) {
    return axios.get(`avis/${id}/interview`)
  },
  favorites() {
    return axios.get('profile/avis/favorites')
  },
  comments() {
    return axios.get('profile/avis/comments')
  },
  stats() {
    return axios.get('profile/avis/stats')
  }
});