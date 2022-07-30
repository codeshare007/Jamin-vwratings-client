export default axios => ({
    fetch(page = 1, filter = {}) {
      return axios.get('nominations', {
        params: {page: page, ...filter}
      });
    },
    create(payload) {
      return axios.post('nominations', payload)
    },
  });