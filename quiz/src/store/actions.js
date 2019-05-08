import api from './api';
import quizParser from '../utils/quiz-parser';
import { QUIZ_STATE } from './mutations.type';

export default {
  async getQuizAPI(store) {
    try {
      const response = await api.getQuizAPI();

      // 파싱한 퀴즈 데이터 state에 저장
      const parsedData = quizParser(response.data);
      store.commit(QUIZ_STATE.QUIZ, parsedData);

      // 퀴즈 진행에 필요한 데이터 state에 초기화
      const quizSolveState = parsedData.questions.reduce((tempArray) => {
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
