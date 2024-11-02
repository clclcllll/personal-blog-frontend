<!-- src/views/Archive.vue -->

<template>
  <div class="archive-page">
    <Navbar />
    <div class="container">
      <h2>文章归档</h2>
      <ul class="archive-list">
        <li v-for="(articles, year) in archives" :key="year">
          <h3>{{ year }}</h3>
          <ul>
            <li v-for="article in articles" :key="article._id">
              <router-link :to="{ name: 'ArticleDetail', params: { id: article._id } }">
                {{ article.title }}
              </router-link>
              <span class="date">{{ formatDate(article.createdAt) }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import { getArticles } from '@/api/article';
import { format } from 'date-fns';

export default {
  name: 'ArchivePage',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const archives = ref({});

    const loadArchives = async () => {
      try {
        const response = await getArticles({ limit: 1000 }); // 获取所有文章
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

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
}
.archive-list {
  list-style: none;
  padding: 0;
}
.archive-list h3 {
  margin-top: 20px;
}
.archive-list li {
  margin-bottom: 10px;
}
.date {
  margin-left: 10px;
  color: #999;
}
</style>
