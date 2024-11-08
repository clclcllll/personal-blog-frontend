<!-- src/views/Home.vue -->

<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 封面部分 -->
    <section class="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <!-- 水墨效果背景 -->
      <InkEffect />

      <h1 class="text-5xl font-bold mb-4 relative z-10">墨柏Blog</h1>

      <!-- 打字效果 -->
      <TypingEffect class="relative z-10" />

      <!-- 滚动按钮组件，传递滚动方法 -->
      <ScrollButton :scrollToContent="scrollToContent" />

    </section>

    <!-- 主内容部分 -->
    <div ref="contentSection" class="container mx-auto max-w-screen-lg px-4 py-12 flex gap-8">
      <!-- 文章列表 -->
      <div class="flex-1">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">热门文章</h2>
        <ArticleList />
      </div>

      <!-- 侧边栏：分类和标签 -->
      <aside class="w-64 space-y-6">
        <CategoryCard />
        <TagCard />
      </aside>
    </div>

    <!-- 页脚 -->
    <!-- <Footer /> -->
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import ArticleList from '@/components/articles/ArticleList.vue';
import TypingEffect from "@/components/common/TypingEffect.vue";
import InkEffect from "@/components/common/InkEffect.vue";
import CategoryCard from "@/components/common/CategoryCard.vue";
import TagCard from "@/components/common/TagCard.vue";
import ScrollButton from "@/components/common/ScrollButton.vue";

export default {
  name: 'Home',
  components: {
    ScrollButton,
    TagCard,
    CategoryCard,
    InkEffect,
    TypingEffect,
    Navbar,
    Footer,
    ArticleList,
  },
  methods: {
    scrollToContent() {
      this.$refs.contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>
