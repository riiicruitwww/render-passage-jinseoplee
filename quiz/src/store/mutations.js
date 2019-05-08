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
  [types.QUIZ_STATE.UPDATE_QUIZ_SOLVE_STATE](state, { index, value }) {
    state.QuizState.quizSolveState[index].selectedAnswer = value;
  },
  [types.QUIZ_STATE.RESET_QUIZ_SOLVE_STATE](state) {
    state.QuizState.quizSolveState = state.QuizState.quiz.questions.reduce((tempArray) => {
      tempArray.push({
        selectedAnswer: '',
        isCheckedAnswer: false,
      });
      return tempArray;
    }, []);
  },
};
