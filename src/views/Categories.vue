<!-- src/views/Categories.vue -->

<template>
  <Navbar />
  <div class="categories-page min-h-screen">
    <!-- 分类标题 -->
    <div class="container mx-auto max-w-screen-lg px-4 py-12 mt-16">
      <h2 class="text-4xl font-bold text-gray-800 mb-8 flex items-center">
        <i class="fas fa-folder text-blue-500 mr-2"></i> 分类列表
      </h2>

      <!-- 分类选择区域 -->
      <ul class="flex flex-wrap gap-2 mb-8">

        <button
            v-for="category in categories"
            :key="category._id"
            @click="selectCategory(category._id)"
            class="px-3 py-1 rounded-full border border-gray-300 text-gray-700 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
            :class="{ 'bg-blue-500 text-white': selectedCategory === category._id }"
        >
          {{ category.name }}
        </button>
      </ul>

      <!-- 文章列表区域 -->
      <ArticleList :selectedCategory="selectedCategory" />
    </div>
  </div>

</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
import ArticleList from "@/components/articles/ArticleList.vue";
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Categories',
  components: { Navbar, Footer, ArticleList },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();


    const categories = ref([]);
    const selectedCategory = ref(null);

    // 加载分类数据
    const loadCategories = async () => {
      await store.dispatch('category/fetchCategories');
      categories.value = store.state.category.categories;

      // 如果有 router 查询参数 selectedCategory，则选中该分类
      const categoryId = route.query.selectedCategory;
      if (categoryId) {
        selectedCategory.value = categoryId;
      }

    };

    // 切换分类选中状态
    const selectCategory = (categoryId) => {
      selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId;//如果当前选中的分类和点击的分类相同，则取消选中
    };

    onMounted(() => {
      loadCategories();
    });

    return {
      categories,
      selectedCategory,
      selectCategory,
    };
  },
};
</script>
