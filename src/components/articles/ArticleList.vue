<!-- src/components/articles/ArticleList.vue -->

<template>
  <div class="article-list space-y-8 mt-8">
    <ArticleItem
        v-for="article in articles"
        :key="article._id"
        :article="article"
    />
    <Pagination
        :currentPage="currentPage"
        :totalPages="pages"
        @page-changed="onPageChanged"
        class="mt-8"
    />
  </div>
</template>

<script>
import { ref, onMounted, watch,computed } from 'vue';
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
  props: {
    selectedTags: {
      type: Array,
      default: () => [],
    },
    selectedCategory: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const store = useStore(); // 使用 useStore() 获取 store 实例
    const route = useRoute(); // 使用 useRoute() 获取当前路由信息

    const currentPage = ref(1);

    // 获取响应式的文章列表、总数、当前页、总页数
    const articles = computed(() => store.state.article.articles);
    const total = computed(() => store.state.article.total);
    const page = computed(() => store.state.article.page);
    const pages = computed(() => store.state.article.pages);


    // 调用 store 中的 actions
    const loadArticles = (page = 1) => {
      const params = {
        page,
        limit: 10,
      };

      //根据params筛选
      if (props.selectedTags.length > 0) {
        params.tags = props.selectedTags; // 传递标签筛选参数
      }
      if (props.selectedCategory) {
        params.category = props.selectedCategory; // 分类筛选参数
      }
      if (route.name === 'Search' && route.query.q) {
        params.keyword = route.query.q; // 传递搜索关键词
      }

      store.dispatch('article/fetchArticles', params); // 调用 fetchArticles action
    };

    const onPageChanged = (newPage) => {
      currentPage.value = newPage;
      loadArticles(newPage);
    };

    onMounted(() => {
      loadArticles();
    });

    watch(
        () => [route.name, route.query.q, props.selectedTags,props.selectedCategory],
        () => {
          loadArticles(1);
        },
        { deep: true } // 深度监听以捕获数组变化
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
