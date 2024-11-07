<!-- src/components/common/ArchiveList.vue -->

<template>
  <div class="archive-list space-y-8 max-w-3xl ">
    <ul>
      <li v-for="(articles, year) in archives" :key="year">
        <!-- 年份标题 -->
        <h3 class="text-2xl font-semibold text-gray-700 mb-4">{{ year }}</h3>

        <ul class="space-y-4">
          <li
              v-for="article in articles"
              :key="article._id"
              class="group flex justify-between items-center bg-white border border-gray-200 rounded-lg shadow-sm p-4 transition-colors duration-300 transform hover:bg-blue-500 hover:text-white"
          >
            <!-- 整个 div 可点击，触发路由跳转 -->
            <router-link
                :to="{ name: 'ArticleDetail', params: { id: article._id } }"
                class="flex justify-between items-center w-full"
            >
              <!-- 文章标题 -->
              <span class="text-gray-700 group-hover:text-white font-medium transition">{{ article.title }}</span>

              <!-- 日期 -->
              <span class="text-sm text-gray-500 group-hover:text-white flex items-center">
                <i class="far fa-calendar-alt mr-1"></i> {{ formatDate(article.createdAt) }}
              </span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getArticles } from '@/api/article';
import { format } from 'date-fns';

export default {
  name: 'ArchiveList',
  setup() {
    const archives = ref({});

    // 加载归档数据
    const loadArchives = async () => {
      try {
        const response = await getArticles({ limit: 1000 });
        const articles = response.articles;

        // 按年份归档
        articles.forEach((article) => {
          const year = new Date(article.createdAt).getFullYear();
          if (!archives.value[year]) {
            archives.value[year] = [];
          }
          archives.value[year].push(article);
        });
      } catch (error) {
        console.error('Failed to load archives:', error);
      }
    };

    // 格式化日期
    const formatDate = (date) => {
      return format(new Date(date), 'MM-dd');
    };

    onMounted(() => {
      loadArchives();
    });

    return {
      archives,
      formatDate,
    };
  },
};
</script>
