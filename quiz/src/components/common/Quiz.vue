<template>
  <div class="quiz">
    <paragraph class="quiz__questionArea" v-for="question of questionArea" :key="question" :data="question"/>
    <ul class="quiz__choiceArea">
      <li v-for="(choices, index) of choiceArea" :key="choices" class="quiz__choiceItem">
        <p class="quiz__choiceIndex">{{ index + 1 }}</p>
        <paragraph class="quiz__choiceText" v-for="choice of choices" :key="choice" :data="choice"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Paragraph from '../common/Paragraph';

export default {
  name: 'Quiz',
  components: {
    Paragraph,
  },
  props: {
    question: {
      type: Object,
      require: true,
    },
  },
  computed: {
    questionArea() {
      return this.question.questionArea;
    },
    choiceArea() {
      return this.question.choiceArea;
    },
  },
  created() {
    console.log(this.question);
  },
};
</script>

<style lang="scss" scoped>
.quiz__questionArea {
  margin-bottom: 20px;
}

.quiz__choiceItem {
  font-size: 2rem;
  margin-bottom: 2%;
  display: grid;
  grid-template-columns: 10% 1fr;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: #fff;
    color: #000;
  }

  $paragraphPadding: 0 3%;
  $paragraphLineHeight: 1.5;

  .quiz__choiceIndex {
    border: 2px solid #fff;
    text-align: center;
    padding: $paragraphPadding;
    line-height: $paragraphLineHeight;
  }

  .quiz__choiceText {
    border: 2px solid #fff;
    padding: $paragraphPadding;
    line-height: $paragraphLineHeight;
  }
}
</style>

