export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('votings_peeps', {
      params: { page: page, ...filter }
    });
  },
  create(payload) {
    return axios.post('votings_peeps', payload)
  },
  getPossible() {
    return axios.post('votings_peeps/possible', {});
  }
});