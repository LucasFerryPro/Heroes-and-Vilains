import Vue from 'vue'
import Vuex from 'vuex'
// import heroService from '@/services/hero.service';
import {getOrgs, createOrg, getOrg} from '@/services/org.service';
// import teamService from '@/services/team.service';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    secretOrg: '',
    heroAlias: [],
    currentHero: '',
    teams: [],
    currentTeam: '',
    orgs: [],
    currentOrg: '',
  },
  mutations: {
    setSecretOrg(state, secretOrg) {
      state.secretOrg = secretOrg;
    },
    setOrgs(state, orgs) {
      state.orgs = orgs;
    },
    setCurrentOrg(state, org) {
      state.currentOrg = org;
    },
    addOrg(state, org) {
      state.orgs.push(org);
    },
  },
  actions: {
    async fetchOrgs({commit}) {
      try {
        const orgs = await getOrgs();
        commit('setOrgs', orgs.data.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createOrg({commit}, org) {
      try {
        const newOrg = await createOrg(org);
        commit('addOrg', newOrg.data.data);
      } catch (error) {
        console.error(error);
      }
    },
    async selectOrg({commit}, orgId) {
      try {
        const org = await getOrg(orgId);
        commit('setCurrentOrg', org.data.data[0]);
        console.log(org.data.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {}
})
