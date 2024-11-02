<!-- src/views/About.vue -->

<template>
  <div class="about-page">
    <Navbar />
    <div class="container">
      <h1>关于我们</h1>
      <p>欢迎来到我的个人博客！</p>
      <p>这个博客旨在分享我的学习心得、生活经验和技术文章。</p>
      <!-- 您可以在这里添加更多内容，例如联系方式、社交媒体链接等 -->
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';

export default {
  name: 'AboutPage',
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 800px;
  margin: 20px auto;
  flex: 1;
}

h1 {
  margin-bottom: 20px;
}

p {
  margin-bottom: 15px;
  line-height: 1.6;
}
</style>
