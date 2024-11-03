<!--  src/views/Category.vue-->
<template>
  <div class="category-page">
    <Navbar />
    <div class="container">
      <h2>分类：{{ categoryName }}</h2>
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
import { getCategoryById } from '@/api/category';

export default {
  name: 'CategoryPage',
  components: {
    Navbar,
    Footer,
    ArticleList,
  },
  setup() {
    const route = useRoute();
    const categoryName = ref('');

    const loadCategory = async () => {
      try {
        const response = await getCategoryById(route.params.id);
        categoryName.value = response.category.name;
      } catch (error) {
        console.error('Failed to load category:', error);
      }
    };

    onMounted(() => {
      loadCategory();
    });

    return {
      categoryName,
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