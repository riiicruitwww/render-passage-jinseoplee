import * as types from './mutations.type';

export default {
  [types.QUIZ_STATE.QUIZ](state, quiz) {
    for (const key in quiz) {
      if ({}.hasOwnProperty.call(quiz, key)) {
        state.QuizState.quiz[key] = quiz[key];
      }
    }
  },
  [types.QUIZ_STATE.QUIZ_SOLVE_STATE](state, quizSolveState) {
    state.QuizState.quizSolveState.push(...quizSolveState);
  },
};
