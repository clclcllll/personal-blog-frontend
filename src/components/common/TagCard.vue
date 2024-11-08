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
          class="text-gray-700 text-sm transition-colors duration-300 hover:text-blue-500 flex items-center"
      >
        <!-- 标签名，前面带 # -->
        <span><i class="fas fa-hashtag mr-1"></i>{{ tag.name }}</span>
        <!-- 数量标签，带图标 -->
        <span class="ml-2 flex items-center bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md transition-colors duration-300">
          {{ tag.count }}
        </span>
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
