<template>
  <div class="movie-show">
    <div class="movie-cover">
      <img v-if="movieData.backdrop_path" :src="'https://image.tmdb.org/t/p/original/' + movieData.backdrop_path" :alt="movieData.original_title">
      <img v-else src="../../public/default_cover.jpg" :alt="movieData.original_title">
      <div class="movie-cover-overlay">
        <h1>{{ movieData.original_title }}</h1>
        <p>{{ movieData.overview }}</p>
        <span class="movie-rating">{{ movieData.vote_average }}</span>
        <router-link
          :to="{ name: 'categoryShow', params: { id: item.id } }"
          class="movie-genres"
          tag="span"
          v-for="(item, index) in movieData.genres"
          :key="index">
          {{ item.name }}
        </router-link>
      </div>
    </div>
    <iframe v-if="movieTrailer" id="ytplayer" type="text/html" width="950" height="530"
      :src="'https://www.youtube.com/embed/' + movieTrailer"
      frameborder="0" allowfullscreen>
    </iframe>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'movieShow',
  props: ['id'],
  data: () => ({
    movieData: [],
    movieTrailer: ''
  }),
  methods: {
    async getMovie(movieId) {
      this.response = await api.get(api.url.movie(movieId), {
        params: {
          api_key: api.token,
          append_to_response: 'videos'
        }
      });
      this.movieData = this.response;
      if (this.movieData.videos.results.length) {
        this.movieTrailer = this.movieData.videos.results[0].key;
      }
    }
  },
  mounted() {
    this.getMovie(this.id)
  }
};
</script>
