import api from './api';

export default {
  async getQuizAPI() {
    try {
      const response = await api.getQuizAPI();
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
