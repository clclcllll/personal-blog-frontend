<!-- src/views/Categories.vue -->

<template>
  <Navbar />
  <div class="categories-page">
    <h1>分类列表</h1>
    <ul>
      <li v-for="category in categories" :key="category._id">
        <router-link :to="{ name: 'Category', params: { id: category._id } }">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
  <Footer />
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: 'Categories',
  components: {Navbar, Footer},
  setup() {
    const store = useStore();
    const categories = ref([]);

    const loadCategories = async () => {
      await store.dispatch('category/fetchCategories');
      categories.value = store.state.category.categories;
    };

    onMounted(() => {
      loadCategories();
    });

    return {
      categories,
    };
  },
};
</script>

<style scoped>
.categories-page {
  max-width: 800px;
  margin: 20px auto;
}
.categories-page h1 {
  margin-bottom: 20px;
}
.categories-page ul {
  list-style: none;
  padding: 0;
}
.categories-page li {
  margin-bottom: 10px;
}
</style>
