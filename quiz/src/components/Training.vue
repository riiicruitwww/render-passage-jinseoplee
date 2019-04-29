<template>
  <div class="training">
    <article class="training__articleArea">
      <paragraph class="training__articleHeader" v-for="root of roots" :key="root.id" :data="root"/>
      <paragraph class="training__articleBody" v-for="passage of passages" :key="passage.id" :data="passage"/>
    </article>
    <div class="training__quizArea">
      <quiz-navigation class="training__quizNavigation" :count="questions.length" v-model="currentQuizIndex" :callback="quizNavigationClickCallback"/>
      <quiz v-for="(question, index) of questions" :key="question" v-show="isCurrentQuiz(index)" :question="question"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Paragraph from './common/Paragraph';
import QuizNavigation from './common/QuizNavigation';
import Quiz from './common/Quiz';

export default {
  name: 'Training',
  components: {
    Paragraph,
    QuizNavigation,
    Quiz,
  },
  data() {
    return {
      currentQuizIndex: 0,
    };
  },
  computed: {
    ...mapGetters(['getQuiz']),
    roots() {
      const result = this.getQuiz.passageBox.root.filter((item) => {
        return item.text && item.text.trim();
      });
      return result;
    },
    passages() {
      const result = this.getQuiz.passageBox.passages.filter((item) => {
        return item.text && item.text.trim();
      });
      return result;
    },
    passageTranslations() {
      const result = this.getQuiz.passageBox.passageTranslations.filter((item) => {
        return item.text && item.text.trim();
      });
      return result;
    },
    questions() {
      const result = this.getQuiz.questions.reduce((questions, question) => {
        const questionArea = question.questionArea.filter((questionItem) => {
          return questionItem.text && questionItem.text.trim();
        });
        const choiceArea = question.choiceArea.reduce((choiceList, choiceItems) => {
          choiceList.push(choiceItems.filter((choiceItem) => {
            return choiceItem.text && choiceItem.text.trim();
          }))
          return choiceList;
        }, []);
        const correctAnswer = question.correctAnswer;
        questions.push({
          questionArea,
          choiceArea,
          correctAnswer,
        });
        return questions;
      }, []);
      return result;
    },
  },
  methods: {
    ...mapActions(['getQuizAPI']),
    async init() {
      try {
        await this.getQuizAPI();
        console.log(this.getQuiz);
      } catch (error) {
        throw new Error(error);
      }
    },
    quizNavigationClickCallback(index) {
      console.log(`index :: ${index}`);
      this.currentQuizIndex = index;
    },
    isCurrentQuiz(index) {
      return this.currentQuizIndex === index;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.training {
  height: 100vh;
  display: grid;
  grid-template: 100% / 50% 50%;

  $areaPadding: 4%;

  &__articleArea {
    padding: $areaPadding;
    line-height: 1.8;
    overflow: scroll;
    background-color: #fff;
    color: #000;

    $paragraphMarginBottom: 20px;

    .training__articleHeader {
      margin-bottom: $paragraphMarginBottom;
    }

    .training__articleBody {
      margin-bottom: $paragraphMarginBottom;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__quizArea {
    padding: $areaPadding;
    
    .training__quizNavigation {
      margin-bottom: 5%;
    }
  }
}

@media (orientation: portrait) {
  .training {
    grid-template: 39.5% 59.5% / 100%;
  }
}
</style>
