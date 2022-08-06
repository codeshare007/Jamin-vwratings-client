export default axios => ({
    fetch(page = 1, filter = {}) {
        return axios.get('creeps', {
            params: { page: page, ...filter }
        });
    },

    update(filter = {}) {
        return axios.post('creeps/update', {
            params: { ...filter }
        })
    }
});