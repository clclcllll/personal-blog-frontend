<!-- src/views/Tags.vue -->

<template>
  <div class="tags-page  min-h-screen">
    <!-- 导航栏 -->
    <Navbar />

    <!-- 标签部分 -->
    <div class="container mx-auto max-w-screen-lg px-4 py-12 mt-16">
      <h2 class="text-4xl font-bold text-gray-800 mb-8 flex items-center">
        <i class="fas fa-tags text-blue-500 mr-2"></i> 标签列表
      </h2>

      <!-- 标签选择区域 -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
            v-for="tag in tags"
            :key="tag._id"
            @click="toggleTagSelection(tag)"
            class="px-3 py-1 rounded-full border border-gray-300 text-gray-700 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
            :class="{ 'bg-blue-500 text-white': selectedTags.includes(tag._id) }"
        >
          {{ tag.name }}
        </button>
      </div>

      <!-- 文章列表区域 -->
      <ArticleList :selectedTags="selectedTags" />

    </div>

  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {useRoute, useRouter} from "vue-router";
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
import ArticleList from "@/components/articles/ArticleList.vue";



export default {
  name: 'Tags',
  components: {Navbar, Footer,ArticleList},
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const tags = ref([]);
    const selectedTags = ref([]);

    // 加载标签数据
    const loadTags = async () => {
      await store.dispatch('tag/fetchTags');
      tags.value = store.state.tag.tags;

      // 检查并选中路由的 selectedTag 查询参数
      const selectedTag = route.query.selectedTag;
      if (selectedTag) {
        selectedTags.value.push(selectedTag);
      }

    };
    // 切换标签选中状态
    const toggleTagSelection = (tag) => {
      if (selectedTags.value.includes(tag._id)) {
        selectedTags.value = selectedTags.value.filter(id => id !== tag._id);
      } else {
        selectedTags.value.push(tag._id);
      }
    };
    //打印selectedTages
    console.log(selectedTags.value);

    onMounted(() => {
      loadTags();
    });

    return {
      tags,
      selectedTags,
      toggleTagSelection,
    };
  },
};
</script>
