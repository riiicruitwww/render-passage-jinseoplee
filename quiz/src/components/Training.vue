<template>
  <div class="training">
    <article class="training__articleArea">
      <paragraph class="training__articleHeader" v-for="root of roots" :key="root.id" :data="root"/>
      <paragraph class="training__articleBody" v-for="passage of passages" :key="passage.id" :data="passage"/>
    </article>
    <div class="training__quizArea">
      <div class="training__quizControl">
        <p class="training__checkAnswer" @click="checkAnswer" v-if="!isCompleted">정답 확인</p>
        <p class="training__restart" @click="restart" v-else-if="isCompleted">다시 풀기</p>
        <p class="training__nextQuiz" @click="next" v-if="!isCompleted">다음 문제</p>
        <p class="training__review" @click="review" v-else-if="isCompleted">리뷰</p>
      </div>
      <div class="training__quiz" v-if="!showReview">
        <quiz-navigation class="training__quizNavigation" :count="questions.length" v-model="currentQuizIndex" :callback="quizNavigationClickCallback"/>
        <quiz v-for="(question, index) of questions" :key="index" v-show="isCurrentQuiz(index)" :question="question" :quizno="index" :isCheckedAnswer="isCheckedAnswer"/>
      </div>
      <div class="training__reviewArea" v-else-if="showReview">
        <h2>해석</h2>
        <paragraph class="reviewArea__translate" v-for="passage of passageTranslations" :key="passage.id" :data="passage"/>
        <h2>단어</h2>
        <div class="reviewArea__voca" v-for="(item, index) of vocabularies" :key="index">
          <p class="voca__word">{{ item.word }}</p>
          <p class="voca__meaning">{{ item.meaning }}</p>
        </div>
      </div>
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
  created() {
    this.init();
  },
  components: {
    Paragraph,
    QuizNavigation,
    Quiz,
  },
  data() {
    return {
      isCheckedAnswer: false,
      currentQuizIndex: 0,
      showReview: false,
    };
  },
  computed: {
    ...mapGetters(['getQuiz', 'getQuizSolveState']),
    roots() {
      const result = this.getQuiz.passageBox.root.filter((item) => {
        return item.text && item.text.trim();
      });
      return result;
    },
    toiecType() {
      return this.getQuiz.type;
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
    vocabularies() {
      return this.getQuiz.passageBox.vocabularies;
    },
    questions() {
      const result = this.getQuiz.questions.reduce((questions, question) => {
        const questionArea = question.questionArea.filter((questionItem) => {
          return questionItem.text && questionItem.text.trim();
        });
        const choiceArea = question.choiceArea.reduce((choiceList, choiceItems) => {
          choiceList.push(choiceItems.filter((choiceItem) => {
            return choiceItem.text && choiceItem.text.trim();
          }));
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
    isCompleted() {
      return this.getQuizSolveState.every((item) => {
        return item.isCheckedAnswer;
      });
    },
  },
  watch: {
    currentQuizIndex(currentValue) {
      this.isCheckedAnswer = this.getQuizSolveState[currentValue].isCheckedAnswer;
    },
    isCheckedAnswer(currentValue) {
      this.getQuizSolveState[this.currentQuizIndex].isCheckedAnswer = currentValue;
    },
  },
  methods: {
    ...mapActions(['getQuizAPI']),
    async init() {
      try {
        await this.getQuizAPI();
      } catch (error) {
        throw new Error(error);
      }
    },
    quizNavigationClickCallback(index) {
      if (!this.getQuizSolveState[this.currentQuizIndex].isCheckedAnswer) {
        alert('문제를 풀어주세요.');
        return;
      }
      this.currentQuizIndex = index;
    },
    isCurrentQuiz(index) {
      return this.currentQuizIndex === index;
    },
    checkAnswer() {
      if (this.getQuizSolveState[this.currentQuizIndex].selectedAnswer === '') {
        alert('답을 선택해주세요.');
        return;
      }
      this.isCheckedAnswer = true;
    },
    next() {
      if (!this.getQuizSolveState[this.currentQuizIndex].isCheckedAnswer) {
        alert('문제를 풀어주세요.');
        return;
      }

      if (this.currentQuizIndex < this.questions.length - 1) {
        this.currentQuizIndex += 1;
      }
    },
    review() {
      this.showReview = true;
    },
    restart() {
      this.showReview = false;
      this.isCompleted = false;
      for (const item of this.getQuizSolveState) {
        item.selectedAnswer = '';
        item.isCheckedAnswer = false;
      }
      this.currentQuizIndex = 0;
    },
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
    overflow: scroll;

    .training__quizControl {
      display: flex;
      text-align: center;
      background-image: linear-gradient(to right, #d76984 0%, #6b98d9 100%);
      padding: 2%;
      font-size: 1.2rem;
      font-weight: 700;

      $quizControlItemWidth: 50%;

      p {
        width: $quizControlItemWidth;
        cursor: pointer;
      }
    }

    .training__quiz {
      padding: $areaPadding;

      .training__quizNavigation {
        margin-bottom: 5%;
      }
    }

    .training__reviewArea {
      padding: $areaPadding;
      line-height: 1.8;

      h2 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 20px;
        border-bottom: 1px solid #fff;
      }

      .reviewArea__translate {
        margin-bottom: 20px;
      }

      .voca__word {
        float: left;
        width: 9em;
      }

      .voca__meaning {
        overflow: hidden;
      }
    }
  }
}

@media (orientation: portrait) {
  .training {
    grid-template: 39.5% 60.5% / 100%;
  }
}
</style>
