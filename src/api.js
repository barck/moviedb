import axios from 'axios';
import store from './store/index';

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    store.commit('LOADING', true);
    return config;
  },
  (error) => {
    store.commit('LOADING', true);
    Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    store.commit('LOADING', false);
    return response;
  },
  (error) => {
    store.commit('LOADING', true);
    return Promise.reject(error);
  },
);

const BASE_URL_NEW = 'https://api.themoviedb.org/3/';

export default {
  url: {
    cats: `${BASE_URL_NEW}genre/movie/list`,
    moviesByCat: `${BASE_URL_NEW}discover/movie`,
    movie(movieId) {
      return `${BASE_URL_NEW}movie/${movieId}`
    },
    topMovies: `${BASE_URL_NEW}movie/popular`
  },
  token: 'c5bfe25fb2070d00419166c591b57ff2',
  get(url, config) {
    return axios
      .get(url, config)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
  post(url, request, config) {
    return axios
      .post(url, request, config)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  put(url, request, config) {
    return axios
      .put(url, request, config)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  head(url) {
    return axios
      .head(url)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },
  delete(url, config) {
    return axios
      .delete(url, config)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
