<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center mb-4">
      <i class="fas fa-tag text-gray-500 mr-2"></i>
      <h3 class="text-xl font-semibold text-gray-700">Tags</h3>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
          v-for="tag in tags"
          :key="tag._id"
          @click="navigateToTagsPage(tag._id)"
          class="px-3 py-1 border border-gray-300 rounded-full text-gray-700 text-sm transition-colors duration-300 hover:bg-blue-500 hover:text-white"
      >
        {{ tag.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'TagCard',
  setup() {
    const store = useStore();
    const router = useRouter();
    const tags = ref([]);

    const loadTags = async () => {
      await store.dispatch('tag/fetchTags');
      tags.value = store.state.tag.tags;
    };

    const navigateToTagsPage = (tagId) => {
      router.push({ name: 'Tags', query: { selectedTag: tagId } });
    };

    onMounted(() => {
      loadTags();
    });

    return {
      tags,
      navigateToTagsPage,
    };
  },
};
</script>
