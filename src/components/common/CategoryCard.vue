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
            class="flex items-center justify-between p-2 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
        >
          <span class="group-hover:text-white">{{ category.name }}</span>
          <span class="bg-blue-600 text-white rounded-full px-3 py-1 text-xs group-hover:bg-blue-700">
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
