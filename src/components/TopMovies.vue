<template>
  <div>
    <span class="headline top-headline">Popular movies</span>
     <div class="movies-flex">
      <router-link
        :to="{ name: 'movieShow', params: { id: item.id } }"
        class="movies-item"
        tag="div"
        v-for="(item, index) in movies"
        :key="index">
        <img v-if="item.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + item.poster_path" :alt="item.original_title">
        <img v-else src="../../public/default_poster.jpg">
        <span class="movie-rating">{{ item.vote_average }}</span>
        <span class="movie-title">{{ item.original_title }}</span>
        <span class="movie-year">{{ item.release_date.substr(0, 4) }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'topMovies',
  data: () => ({
    movies: [],
    page: 1
  }),
  methods: {
    async getTopMovies() {
      this.response = await api.get(api.url.topMovies, {
        params: {
          api_key: api.token,
          page: this.page
        }
      });
      if (this.page > 1) {
        for (let i = 0; i < this.response.results.length; i += 1) {
          this.movies.push(this.response.results[i]);
        }
      } else {
        this.movies = this.response.results;
      }
      this.page_max = this.response.total_pages;
    },
    loadPage() {
      window.onscroll = () => {
        if ((window.scrollY+1 >= document.documentElement.scrollHeight-document.documentElement.clientHeight) && (this.$route.name === 'topMovies')) {
          if (this.page !== this.movies.total_pages) {
            this.page += 1;
            this.getTopMovies();
          }
        }
      };
    }
  },
  mounted() {
    this.getTopMovies();
    this.loadPage();
  }
};
</script>