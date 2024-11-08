<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center mb-4">
      <i class="fas fa-folder text-gray-500 mr-2"></i>
      <h3 class="text-xl font-semibold text-gray-700">Categories</h3>
    </div>
    <ul class="space-y-2">
      <li
          v-for="category in categories"
          :key="category._id"
          class="border border-gray-300 rounded-lg overflow-hidden group"
      >
        <router-link
            :to="{ name: 'Categories', query: { selectedCategory: category._id } }"
            class="flex items-center justify-between p-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white group rounded-lg shadow-sm"
        >
          <!-- 分类名称 -->
          <span class="text-gray-700 group-hover:text-white font-medium">
            {{ category.name }}
          </span>

          <!-- 数量标签 -->
          <span class="bg-blue-500 text-white rounded-full px-3 py-0.5 text-xs font-bold ml-2 shadow-md transition-colors duration-300 group-hover:bg-white group-hover:text-blue-500 flex items-center">
             {{ category.count }}
          </span>
        </router-link>


      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CategoryCard',
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
