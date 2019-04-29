<template>
  <div class="quizNavigation">
    <div class="quizNavigation__item" :class="isActive(item)" v-for="item of countArray" :key="item" @click="naviItemClick(item)">
      {{ `Q${item + 1}` }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizNavigation',
  props: {
    count: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    callback: {
      type: Function,
    },
  },
  computed: {
    countArray() {
      return [...Array(this.count).keys()].map(item => item);
    },
  },
  methods: {
    isActive(index) {
      return this.value === index ? 'quizNavigation__item--active' : '';
    },
    naviItemClick(index) {
      if (this.callback) {
        this.callback(index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.quizNavigation {
  display: flex;
  justify-content: left;
  overflow: scroll;

  .quizNavigation__item {
    padding: 5%;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;

    &--active {
      border-bottom: 5px solid #fff;
    }
  }
}
</style>

