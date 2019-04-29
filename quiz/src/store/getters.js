export default {
  getQuiz: (state) => {
    return state.QuizState.quiz;
  },
  getQuizSolveState: (state) => {
    return state.QuizState.quizSolveState;
  },
};
