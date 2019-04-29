<template>
  <div class="quiz">
    <paragraph class="quiz__questionArea" v-for="question of questionArea" :key="question" :data="question"/>
    <ul class="quiz__choiceArea">
      <li v-for="(choices, index) of choiceArea" :key="choices" class="quiz__choiceItem">
        <input type="radio" :id="`choiceItem_${quizno}_${index}`" :name="`choiceItem_${quizno}`" :value="indexToAlphabet(index)" v-model="choiceValue">
        <label :for="`choiceItem_${quizno}_${index}`" :class="isCorrectAnswer(indexToAlphabet(index))">
          <p class="quiz__choiceIndex">{{ index + 1 }}</p>
          <paragraph class="quiz__choiceText" v-for="choice of choices" :key="choice" :data="choice"/>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
    quizno: {
      type: Number,
      default: 0,
    },
    isCheckedAnswer: {
      tyoe: Boolean,
      default: false,
    },
  },
  data() {
    return {
      choiceValue: '',
    };
  },
  computed: {
    ...mapGetters(['getQuizSolveState']),
    questionArea() {
      return this.question.questionArea;
    },
    choiceArea() {
      return this.question.choiceArea;
    },
    correctAnswer() {
      return this.question.correctAnswer;
    },
  },
  watch: {
    choiceValue() {
      this.getQuizSolveState[this.quizno].selectedAnswer = this.choiceValue;
    },
  },
  methods: {
    indexToAlphabet(index) {
      const alpabet = ['a', 'b', 'c', 'd', 'e'];
      return alpabet[index];
    },
    isCorrectAnswer(value) {
      return this.isCheckedAnswer && this.correctAnswer === value ? 'isCorrectAnswer' : '';
    },
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

  &:last-child {
    margin-bottom: 0;
  }

  & input {
    display: none;

    &:checked + label:not(.isCorrectAnswer) {
      background-color: #fff;
      color: #000;
    }
  }

  .isCorrectAnswer {
    background-color: #47c83e;
  }

  & label {
    display: grid;
    grid-template-columns: 10% 1fr;
    cursor: pointer;

    &:not(.isCorrectAnswer):hover {
      background-color: #fff;
      color: #000;
    }

    $borderColor: #fff;
    $paragraphPadding: 0 3%;
    $paragraphLineHeight: 1.5;

    .quiz__choiceIndex {
      text-align: center;
      padding: $paragraphPadding;
      line-height: $paragraphLineHeight;
    }

    .quiz__choiceText {
      padding: $paragraphPadding;
      line-height: $paragraphLineHeight;
    }
  }
}
</style>

