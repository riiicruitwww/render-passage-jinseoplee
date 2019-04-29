import * as types from './mutations.type';

export default {
  [types.QUIZ](state, quiz) {
    for (const key in quiz) {
      if ({}.hasOwnProperty.call(quiz, key)) {
        state.Quiz[key] = quiz[key];
      }
    }
  },
};
