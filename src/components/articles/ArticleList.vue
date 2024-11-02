<!-- src/components/articles/ArticleList.vue -->

<template>
  <div class="article-list">
    <ArticleItem
        v-for="article in articles"
        :key="article._id"
        :article="article"
    />
    <!-- 分页器 -->
    <Pagination
        :currentPage="page"
        :totalPages="pages"
        @page-changed="onPageChanged"
    />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { mapActions, mapState } from 'vuex';
import ArticleItem from './ArticleItem.vue';
import Pagination from '@/components/common/Pagination.vue';

export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
    Pagination,
  },
  setup() {
    const route = useRoute();
    const { fetchArticles } = mapActions('article', ['fetchArticles']);
    const { articles, total, page, pages } = mapState('article', [
      'articles',
      'total',
      'page',
      'pages',
    ]);

    const currentPage = ref(1);

    const loadArticles = (page = 1) => {
      const params = {
        page,
        limit: 10,
      };
      // 如果有分类或标签参数
      if (route.params.categoryId) {
        params.category = route.params.categoryId;
      }
      if (route.params.tagId) {
        params.tag = route.params.tagId;
      }
      fetchArticles(params);
    };

    const onPageChanged = (newPage) => {
      currentPage.value = newPage;
      loadArticles(newPage);
    };

    onMounted(() => {
      loadArticles();
    });

    // 监听路由变化，重新加载文章列表
    watch(
        () => route.params,
        () => {
          loadArticles();
        }
    );

    return {
      articles,
      total,
      page,
      pages,
      currentPage,
      onPageChanged,
    };
  },
};
</script>

<style scoped>
.article-list {
  margin: 20px 0;
}
</style>
