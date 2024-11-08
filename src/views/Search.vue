<!-- src/views/Search.vue -->
<template>
  <div class="search-page min-h-screen bg-gray-50">
    <Navbar />
    <div class="container mx-auto max-w-screen-lg px-4 py-12 mt-16">
      <!-- 搜索标题 -->
      <h2 class="text-4xl font-bold text-gray-800 mb-8 flex items-center">
        <i class="fas fa-search text-blue-500 mr-2"></i> 搜索结果
      </h2>

      <!-- 搜索关键词展示 -->
      <p class="text-lg text-gray-600 mb-8">
        搜索关键词：<span class="font-semibold text-gray-800">{{ keyword }}</span>
      </p>

      <!-- 文章列表区域 -->
      <ArticleList :keyword="keyword" />
    </div>
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
.search-page {
  background-color: #f9fafb;
}
</style>
