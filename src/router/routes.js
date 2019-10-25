import CategoryShow from '../components/CategoryShow.vue';
import MovieShow from '../components/MovieShow.vue';
import TopMovies from '../components/TopMovies.vue';

export default [
  {
    path: '/',
    name: 'topMovies',
    component: TopMovies
  },
  {
    path: '/category/:id',
    name: 'categoryShow',
    component: CategoryShow,
    props: true
  },
  {
    path: '/movie/:id',
    name: 'movieShow',
    component: MovieShow,
    props: true
  }
];
