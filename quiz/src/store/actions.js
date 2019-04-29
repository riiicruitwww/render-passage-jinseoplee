import api from './api';
import quizParser from '../utils/quiz-parser';
import { QUIZ } from './mutations.type';

export default {
  async getQuizAPI(store) {
    try {
      const response = await api.getQuizAPI();
      store.commit(QUIZ, quizParser(response.data));
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
