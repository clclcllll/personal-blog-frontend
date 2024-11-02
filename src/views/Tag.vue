<!-- src/views/Tag.vue -->

<template>
  <div class="tag-page">
    <Navbar />
    <div class="container">
      <h2>标签：{{ tagName }}</h2>
      <ArticleList />
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import ArticleList from '@/components/articles/ArticleList.vue';
import { getTagById } from '@/api/tag';

export default {
  name: 'TagPage',
  components: {
    Navbar,
    Footer,
    ArticleList,
  },
  setup() {
    const route = useRoute();
    const tagName = ref('');

    const loadTag = async () => {
      try {
        const response = await getTagById(route.params.id);
        tagName.value = response.tag.name;
      } catch (error) {
        console.error('Failed to load tag:', error);
      }
    };

    onMounted(() => {
      loadTag();
    });

    return {
      tagName,
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
