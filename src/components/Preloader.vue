<template>
  <div class="preloader-wrapper">
    <div class="preloader" v-if="isVisible">
    </div>
  </div>
</template>

<script>
export default {
  name: 'preloader',
  data: () => ({
    isVisible: false
  }),
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    changePreloaderState() {
      if (this.isLoading) {
        this.timeoutPreloading = setTimeout(() => { this.isVisible = true; }, 100);
      } else {
        if (this.timeoutPreloading) {
          clearTimeout(this.timeoutPreloading);
        }
        this.isVisible = false;
      }
    }
  },
  watch: {
    isLoading() {
      this.changePreloaderState();
    }
  }
};
</script>
