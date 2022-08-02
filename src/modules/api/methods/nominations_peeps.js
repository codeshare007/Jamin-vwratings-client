export default axios => ({
    fetch(page = 1, filter = {}) {
      return axios.get('nominations_peeps', {
        params: {page: page, ...filter}
      });
    },
    create(payload) {
      return axios.post('nominations_peeps', payload)
    },
    getPossible() {
      return axios.post('nominations_peeps/possible', {});
    }
  });