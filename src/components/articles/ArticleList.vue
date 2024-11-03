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
        :currentPage="currentPage"
        :totalPages="pages"
        @page-changed="onPageChanged"
    />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ArticleItem from './ArticleItem.vue';
import Pagination from '@/components/common/Pagination.vue';

export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
    Pagination,
  },
  setup() {
    const store = useStore(); // 使用 useStore() 获取 store 实例
    const route = useRoute(); // 使用 useRoute() 获取当前路由信息
    const currentPage = ref(1);

    // 从 store 中获取状态
    const articles = store.state.article.articles;
    const total = store.state.article.total;
    const page = store.state.article.page;
    const pages = store.state.article.pages;

    // 调用 store 中的 actions
    const loadArticles = (page = 1) => {
      const params = {
        page,
        limit: 10,
      };

      if (route.name === 'Category') {
        params.category = route.params.id;
      } else if (route.name === 'Tag') {
        params.tag = route.params.id;
      }

      //打印params
      console.log(params);
      store.dispatch('article/fetchArticles', params); // 调用 fetchArticles action
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
