<!-- src/views/Home.vue -->

<template>
  <div class="home-page">
    <Navbar />
    <div class="container">
      <ArticleList />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import ArticleList from '@/components/articles/ArticleList.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer,
    ArticleList,
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
}
</style>
