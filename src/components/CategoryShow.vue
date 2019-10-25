<template>
  <div>
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
  name: 'categoryShow',
  props: ['id'],
  data: () => ({
    movies: [],
    page: 1
  }),
  computed: {
    catId: function () {
      return this.id;
    }
  },
  methods: {
    async getMoviesByCat(genreId) {
      this.response = await api.get(api.url.moviesByCat, {
        params: {
          api_key: api.token,
          with_genres: genreId,
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
        if ( ( window.scrollY+1 >= document.documentElement.scrollHeight-document.documentElement.clientHeight) && (this.$route.name === 'categoryShow') ) {
          if (this.page !== this.movies.total_pages) {
            this.page += 1;
            this.getMoviesByCat(this.id);
          }
        }
      };
    }
  },
  watch: {
    catId() {
      this.movies = null;
      this.page = 1;
      this.getMoviesByCat(this.id);
    },
  },
  mounted() {
    this.getMoviesByCat(this.id);
    this.loadPage();
  }
};
</script>
