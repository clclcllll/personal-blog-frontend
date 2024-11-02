<!-- src/views/Search.vue -->

<template>
  <div class="search-page">
    <Navbar />
    <div class="container">
      <h2>搜索结果：{{ keyword }}</h2>
      <ArticleList />
    </div>
    <Footer />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import ArticleList from '@/components/articles/ArticleList.vue';

export default {
  name: 'SearchPage',
  components: {
    Navbar,
    Footer,
    ArticleList,
  },
  setup() {
    const route = useRoute();
    const keyword = computed(() => route.query.q || '');

    return {
      keyword,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
}
</style>
