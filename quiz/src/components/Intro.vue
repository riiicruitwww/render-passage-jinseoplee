<template>
  <div class="intro">
    <button type="button" class="intro__startBtn" @click="goTraining">START</button>
  </div>
</template>

<script>
export default {
  name: 'Intro',
  methods: {
    goTraining() {
      this.$router.push({ name: 'Training' });
    },
  },
};
</script>

<style lang="scss" scoped>
.intro {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__startBtn {
    display: inline-block;
    padding: 15px;
    font-size: 5rem;
    background-color: #000;
    color: #fff;
    margin: 7px;

    &::before {
      content: '';
      background: linear-gradient(to right, #d76984 0%, #6b98d9 100%) no-repeat;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      border-radius: 5px;
    }

    &:hover {
      background-image: linear-gradient(to right, #d76984 0%, #6b98d9 100%);
    }
  }
}

</style>
