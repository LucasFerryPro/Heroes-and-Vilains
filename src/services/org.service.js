import myAxios from "@/services/axios.service";
import store from '@/store/index.js';

const getOrgs = () => {
    return myAxios.get("orgs/get");
}
 const createOrg = (org) => {
    return myAxios.post("orgs/create", org);
}

const addTeam = (team) => {
    return myAxios.patch("orgs/addteam", team,
      {headers: {'org-secret': store.state.secretOrg}});
}

const removeTeam = (team) => {
    return myAxios.patch("orgs/removeteam", team,
      {headers: {'org-secret': store.state.secretOrg}});
}

const getOrg = (id) => {
    return myAxios.get("orgs/getbyid/" + id,
      {headers: {'org-secret': store.state.secretOrg}});
}

export {
    getOrgs,
    createOrg,
    addTeam,
    removeTeam,
    getOrg
}