<template>
  <div>
    <router-link
      :to="{ name: 'categoryShow', params: { id: item.id, name: item.name } }"
      :class="{ active: getCatId == item.id }"
      tag="a">
      {{ item.name }}
    </router-link>
    <!-- <a :href="`category/${item.id}`" class="next-routing">
      <h3>{{ item.name }}</h3>
    </a> -->
  </div>
</template>

<script>

export default {
  name: 'CategoryItem',
  props: ['item'],
  data: () => ({
  }),
  computed: {
    getCatId() {
      return this.$route.params.id;
    }
  }
};
</script>
