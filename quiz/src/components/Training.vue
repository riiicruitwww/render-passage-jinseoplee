<template>
  <div>Hello toeic</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Training',
  methods: {
    ...mapActions(['getQuizAPI']),
    async getQuiz() {
      try {
        await this.getQuizAPI();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
