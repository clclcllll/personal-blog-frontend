<!-- src/views/ArticleDetail.vue -->

<template>

  <div class="article-page">
    <Navbar />
    <ArticleDetail />
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
