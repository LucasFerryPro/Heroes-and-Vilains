const myAxios = require("@/services/axios.service");
const store = require('@/store/index.js');

const getaliases = () => {
    return myAxios.get('heroes/getaliases');
}
const createhero = (hero) => {
    return myAxios.post('heroes/create', hero);
}

const updatehero = (hero) => {
    return myAxios.put('heroes/update', hero,
        {headers: {'org-secret': store.state.secretOrg}});
}

const getherobyid = (id) => {
    return myAxios.get('heroes/getbyid/' + id,
        {headers: {'org-secret': store.state.secretOrg}});
}

module.exports = {
    getaliases,
    createhero,
    updatehero,
    getherobyid
}