export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('votings', {
      params: { page: page, ...filter }
    });
  },
  create(payload) {
    return axios.post('votings', payload)
  },
  getPossible() {
    return axios.post('votings/possible', {});
  }
});