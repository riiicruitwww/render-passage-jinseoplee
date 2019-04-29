import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const Quiz = {
  passageBox: {
    name: '',
    type: '',
    preview: '',
    passageTranslations: [],
    passages: [],
    root: [],
    vocabularies: [],
  },
  questions: [],
};

export default new Vuex.Store({
  state: {
    Quiz,
  },
  getters,
  mutations,
  actions,
});
