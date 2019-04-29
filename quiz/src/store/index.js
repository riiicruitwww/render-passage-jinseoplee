import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const QuizState = {
  quiz: {
    type: '',
    preview: '',
    name: '',
    passageBox: {
      passageTranslations: [],
      passages: [],
      root: [],
      vocabularies: [],
    },
    questions: [],
  },
  quizSolveState: [],
};

export default new Vuex.Store({
  state: {
    QuizState,
  },
  getters,
  mutations,
  actions,
});
