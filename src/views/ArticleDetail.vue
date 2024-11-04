<!-- src/views/ArticleDetail.vue -->

<template>

  <div class="article-page">
    <Navbar />
    <div class="container">
      <ArticleDetail />
    </div>
    <Footer />
  </div>

</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import ArticleDetail from '@/components/articles/ArticleDetail.vue';

export default {
  name: 'ArticleDetailPage',
  components: {
    Navbar,
    Footer,
    ArticleDetail,
  },
};
</script>

<style scoped>
.article-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container {
  max-width: 800px;
  margin: 20px auto;
}
</style>
