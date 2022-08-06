export default axios => ({
    fetch(page = 1, filter = {}) {
        return axios.get('peeps', {
            params: { page: page, ...filter }
        });
    },

    update(filter = {}) {
        return axios.post('peeps/update', {
            params: { ...filter }
        })
    }
});