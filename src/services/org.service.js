import myAxios from "@/services/axios.service";
import store from '@/store/index.js';

const getOrgs = () => {
    return myAxios.get("orgs/get");
}

const createOrg = (org) => {
    return myAxios.post("orgs/create", org);
}

const addteam = (team) => {
    return myAxios.patch("orgs/addteam", team,
        {headers: {'secret-org': store.state.secretOrg}});
}

const removeteam = (team) => {
    return myAxios.patch("orgs/removeteam", team,
        {headers: {'secret-org': store.state.secretOrg}});
}

const getorgbyid = (id) => {
    return myAxios.get("orgs/getbyid/" + id,
        {headers: {'secret-org': store.state.secretOrg}});
}

module.exports = {
    getOrgs,
    createOrg,
    addteam,
    removeteam,
    getorgbyid
}