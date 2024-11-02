<!-- src/components/articles/ArticleDetail.vue -->

<template>
  <div v-if="article && article.author" class="article-detail">
    <h1>{{ article.title }}</h1>
    <div class="meta">
      <span>作者：{{ article.author.username }}</span>
      <span>发布时间：{{ formatDate(article.createdAt) }}</span>
      <span>
        分类：
        <router-link :to="{ name: 'Category', params: { id: article.category._id } }">
          {{ article.category.name }}
        </router-link>
      </span>
      <span>阅读：{{ article.views }} 次</span>
    </div>
    <div class="content" v-html="article.htmlContent"></div>
    <div class="tags">
      <span v-for="tag in article.tags" :key="tag._id" class="tag">
        <router-link :to="{ name: 'Tag', params: { id: tag._id } }">{{ tag.name }}</router-link>
      </span>
    </div>
    <div class="like-button">
      <button @click="toggleLike">{{ liked ? '取消点赞' : '点赞' }}（{{ article.likes }}）</button>
    </div>
    <CommentList :articleId="article._id" />
  </div>
  <div v-else>加载中...</div>
</template>


<script>
import {ref, onMounted, computed} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { mapActions, mapState } from 'vuex';
import { format } from 'date-fns';
import CommentList from '@/components/comments/CommentList.vue';
import { likeArticle, unlikeArticle } from '@/api/like';
import store from "@/store/index.js";

export default {
  name: 'ArticleDetail',
  components: {
    CommentList,
  },
  setup() {
    const route = useRoute();
    const { fetchArticleById } = mapActions('article', ['fetchArticleById']);
    const { currentArticle } = mapState('article', ['currentArticle']);

    const liked = ref(false);
    // 使用计算属性绑定当前文章
    const article = computed(() => store.state.article.currentArticle);


    const loadArticle = async () => {
      await store.dispatch('article/fetchArticleById', route.params.id);
    };

    const toggleLike = async () => {
      if (liked.value) {
        await unlikeArticle(currentArticle.value._id);
        liked.value = false;
      } else {
        await likeArticle(currentArticle.value._id);
        liked.value = true;
      }
      // 更新文章点赞数
      loadArticle();
    };

    onMounted(() => {
      loadArticle();
    });

    const formatDate = (date) => {
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    };

    return {
      article, // 使用计算属性 article
      formatDate,
      liked,
      toggleLike,
    };
  },
};
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 20px auto;
}
.article-detail h1 {
  margin-bottom: 20px;
}
.meta {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}
.meta span {
  margin-right: 15px;
}
.content {
  margin-bottom: 20px;
}
.tags {
  margin-top: 20px;
}
.tag {
  display: inline-block;
  margin-right: 10px;
}
.tag a {
  color: #42b983;
  text-decoration: none;
}
.like-button {
  margin: 20px 0;
}
.like-button button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
