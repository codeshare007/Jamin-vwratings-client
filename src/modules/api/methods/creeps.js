export default axios => ({
    fetch(page = 1, filter = {}) {
        return axios.get('creeps', {
            params: { page: page, ...filter }
        });
    },
});