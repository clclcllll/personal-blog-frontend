<!-- src/views/Home.vue -->

<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 封面部分 -->
    <section class="relative h-screen flex flex-col items-center justify-center text-white overflow-h_idden">
      <!-- 水墨效果背景 -->
      <InkEffect />

      <h1 class="text-5xl font-bold mb-4 relative z-10">墨柏Blog</h1>

      <!-- 打字效果 -->
      <TypingEffect class="relative z-10" />

    </section>

    <!-- 主内容部分 -->
    <div class="container mx-auto max-w-screen-lg px-4 py-12 flex gap-8">
      <!-- 文章列表 -->
      <div class="flex-1">
        <h2 class="text-3xl font-semibold mb-6 text-gray-800">热门文章</h2>
        <ArticleList />
      </div>

      <!-- 侧边栏：分类和标签 -->
      <as_ide class="w-64 space-y-6">
        <CategoryCard />
        <TagCard />
      </as_ide>
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
import InkEffect from "@/components/common/InkEffect.vue";
import CategoryCard from "@/components/common/CategoryCard.vue";
import TagCard from "@/components/common/TagCard.vue";

export default {
  name: 'Home',
  components: {
    TagCard,
    CategoryCard,
    InkEffect,
    TypingEffect,
    Navbar,
    Footer,
    ArticleList,
  },
};
</script>
