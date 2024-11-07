<!-- src/components/common/ArchiveList.vue -->

<template>
  <div class="archive-list space-y-8 max-w-3xl">
    <!-- 时间线组件 -->
    <Timeline :years="Object.keys(archives).map(Number)" :selected-year="Number(selectedYear)" @year-selected="scrollToYear" />

    <ul>
      <li
          v-for="year in Object.keys(archives).reverse()"
          :key="year"
          :ref="el => yearRefs[year] = el"
      >
        <!-- 年份标题 -->
        <h3 class="text-2xl font-semibold text-gray-700 mb-4">{{ year }}</h3>

        <ul class="space-y-4">
          <!-- 使用 archives[year] 来访问每个年份的文章数组 -->
          <li
              v-for="article in archives[year]"
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
import Timeline from '@/components/common/Timeline.vue';


export default {
  name: 'ArchiveList',
  components: {Timeline},
  setup() {
    const archives = ref({});
    const selectedYear = ref(null);
    const yearRefs = ref({});

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

    // 跳转到指定年份
    const scrollToYear = (year) => {
      selectedYear.value = year;
      yearRefs.value[year]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    onMounted(() => {
      loadArchives();
    });

    return {
      archives,
      formatDate,
      scrollToYear,
      selectedYear,
      yearRefs,
    };
  },
};
</script>
