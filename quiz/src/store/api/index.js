import axios from 'axios';

export default {
  /**
   * Quiz 조회
   */
  getQuizAPI() {
    return axios.get('/api/quiz');
  },
};
