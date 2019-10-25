<template>
  <div id="app">
    <header>
      <div class="container">
        <nav>
          <router-link to="/">Home</router-link>
        </nav>
      </div>
    </header>
    <div class="wrapper">
      <div class="container">
        <div class="sidebar" v-if="categores">
          <span class="headline">Categoryes:</span>
          <category
            v-for="(item, index) in categores"
            :key="index"
            :item="item">
          </category>
        </div>
        <div class="content">
          <router-view/>
          <preloader></preloader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import Category from './components/CategoryItem.vue';
import Preloader from './components/Preloader.vue';

export default {
  name: 'Index',
  data: () => ({
    categores: []
  }),
  methods: {
    async getCats() {
      this.response = await api.get(api.url.cats, {
        params: {
          api_key: api.token
        }
      });
      this.categores = this.response.genres;
    },
  },
  mounted() {
    this.getCats();
  },
  components: {
    Category,
    Preloader
  }
};
</script>

<style lang="stylus">
  @import './assets/styles/index.styl';
</style>
