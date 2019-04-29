<template>
  <p :style="styles">{{ data.text }}</p>
</template>

<script>
export default {
  name: 'Paragraph',
  props: {
    data: {
      type: Object,
      required: true,
      default: {
        text: '',
        styles: {},
      }
    }
  },
  computed: {
    text() {
      return this.data.text;
    },
    styles() {
      return this.data.styles;
    }
  },
};
</script>
