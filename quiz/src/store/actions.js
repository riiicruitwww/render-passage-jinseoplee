import api from './api';
import quizParser from '../utils/quiz-parser';
import { QUIZ_STATE } from './mutations.type';

export default {
  async getQuizAPI(store) {
    try {
      const response = await api.getQuizAPI();

      // 파싱한 퀴즈 데이터 state에 저장
      const parsedData = await quizParser(response.data);
      store.commit(QUIZ_STATE.QUIZ, parsedData);

      const quizSolveState = await parsedData.questions.reduce((tempArray) => {
        tempArray.push({
          selectedAnswer: '',
          isCheckedAnswer: false,
        });
        return tempArray;
      }, []);
      store.commit(QUIZ_STATE.QUIZ_SOLVE_STATE, quizSolveState);
    } catch (error) {
      throw new Error(error);
    }
  },
};
