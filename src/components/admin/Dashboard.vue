<!-- src/components/admin/Dashboard.vue -->

<template>
  <div class="dashboard">
    <h2>仪表盘</h2>
    <div class="stats">
      <div class="stat-item">
        <h3>{{ articleCount }}</h3>
        <p>文章总数</p>
      </div>
      <div class="stat-item">
        <h3>{{ commentCount }}</h3>
        <p>评论总数</p>
      </div>
      <div class="stat-item">
        <h3>{{ userCount }}</h3>
        <p>用户总数</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getArticles } from '@/api/article';
import { getComments } from '@/api/comment';
import { getUsers } from '@/api/user';

export default {
  name: 'Dashboard',
  setup() {
    const articleCount = ref(0);
    const commentCount = ref(0);
    const userCount = ref(0);

    const loadStats = async () => {
      try {
        const articleResponse = await getArticles({ page: 1, limit: 1 });
        articleCount.value = articleResponse.total;

        const commentResponse = await getComments({ page: 1, limit: 1 });
        commentCount.value = commentResponse.total;

        const userResponse = await getUsers({ page: 1, limit: 1 });
        userCount.value = userResponse.total;
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };

    onMounted(() => {
      loadStats();
    });

    return {
      articleCount,
      commentCount,
      userCount,
    };
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.stat-item {
  text-align: center;
}
.stat-item h3 {
  font-size: 48px;
  margin: 0;
}
.stat-item p {
  font-size: 16px;
  color: #666;
}
</style>
