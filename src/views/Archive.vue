<!-- src/views/Archive.vue -->

<template>
  <div class="archive-page min-h-scree">
    <!-- 导航栏 -->
    <Navbar />
    <!-- 主体内容 -->
    <div class="container mx-auto max-w-screen-lg px-4 py-12 mt-16">
      <h2 class="text-4xl font-bold text-gray-800 mb-8 flex items-center">
        <i class="fas fa-archive mr-2"></i> 文章归档
      </h2>

      <!-- 使用封装的 ArchiveList 组件 -->
      <ArchiveList />
    </div>

    <!--    &lt;!&ndash; 页脚 &ndash;&gt;-->
<!--    <Footer />-->
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import ArchiveList from "@/components/common/ArchiveList.vue";

export default {
  name: 'ArchivePage',
  components: {
    ArchiveList,
    Navbar,
    Footer,
  },
};
</script>
