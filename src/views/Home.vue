<!-- src/views/Home.vue -->

<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 封面部分 -->
    <section class="relative h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
      <h1 class="text-5xl font-bold mb-4">墨柏Blog</h1>

      <!-- 打字效果 -->
      <TypingEffect />


    </section>

    <!-- 主内容部分 -->
    <div class="container mx-auto px-4 py-12 flex gap-8">
      <!-- 文章列表 -->
      <div class="flex-1">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">热门文章</h2>
        <ArticleList />
      </div>

      <!-- 侧边栏：分类和标签 -->
      <aside class="w-64 space-y-6">
        <!-- 分类卡片 -->
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">Categories</h3>
          <ul class="space-y-2">
            <li v-for="category in categories" :key="category.id" class="text-blue-600 hover:text-blue-800 transition-colors">
              <router-link :to="{ name: 'Category', params: { id: category.id } }">
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 标签卡片 -->
        <div class="bg-white rounded-lg shadow p-4">
          <h3 class="text-xl font-semibold text-gray-700 mb-4">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in tags" :key="tag.id" class="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              <router-link :to="{ name: 'Tag', params: { id: tag.id } }">
                #{{ tag.name }}
              </router-link>
            </span>
          </div>
        </div>
      </aside>
    </div>

    <!--    &lt;!&ndash; 页脚 &ndash;&gt;-->
    <!--    <Footer />-->
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import ArticleList from '@/components/articles/ArticleList.vue';
import TypingEffect from "@/components/common/TypingEffect.vue";

export default {
  name: 'Home',
  components: {
    TypingEffect,
    Navbar,
    Footer,
    ArticleList,
  },
  data() {
    return {
      categories: [
        { id: 1, name: '技术分享' },
        { id: 2, name: '随笔' },
        { id: 3, name: '生活' },
      ],
      tags: [
        { id: 1, name: 'JavaScript' },
        { id: 2, name: 'Vue' },
        { id: 3, name: 'CSS' },
      ],
    };
  },
};
</script>
