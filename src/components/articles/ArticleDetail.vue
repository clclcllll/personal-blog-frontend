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
    <div v-if="article && article._id" class="like-button">
      <button @click="toggleLike">{{ liked ? '取消点赞' : '点赞' }}（{{ article.likes }}）</button>
    </div>


    <CommentList :articleId="article._id" />
  </div>
  <div v-else>加载中...</div>
</template>


<script>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { format } from 'date-fns';
import CommentList from '@/components/comments/CommentList.vue';
import { likeArticle, unlikeArticle } from '@/api/like';

export default {
  name: 'ArticleDetail',
  components: {
    CommentList,
  },
  setup() {
    const route = useRoute();
    const store = useStore();


    const liked = ref(false);
    // 使用计算属性绑定当前文章
    const article = computed(() => store.state.article.currentArticle);

    const loadArticle = async () => {
      try {
        await store.dispatch('article/fetchArticleById', route.params.id);
        // 设置 liked 状态
        liked.value = article.value.liked;
      } catch (error) {
        console.error('加载文章详情失败：', error);
      }
    };

    const toggleLike = async () => {

      // 检查 article 数据是否已加载，并确保有 _id 属性
      if (!article.value || !article.value._id) {
        console.warn("文章尚未加载完成，无法点赞");
        return;
      }

      try {
        if (liked.value) {
          const response = await unlikeArticle(article.value._id);
          liked.value = response.liked; // 设置为 false
          article.value.likes = response.likes; // 更新点赞数
          // 更新文章点赞数 in store
          store.commit('article/SET_CURRENT_ARTICLE', {
            article: { ...article.value, likes: response.likes },
            liked: response.liked
          });

        } else {
          const response = await likeArticle(article.value._id);
          liked.value = response.liked; // 设置为 true
          article.value.likes = response.likes; // 更新点赞数
          // 更新 article in store
          store.commit('article/SET_CURRENT_ARTICLE', {
            article: { ...article.value, likes: response.likes },
            liked: response.liked
          });

        }

      } catch (error) {
        console.error("点赞操作失败：", error);
      }

    };

    onMounted(() => {
      loadArticle();
    });
    // 监听路由参数变化
    watch(
        () => route.params.id,
        (newId) => {
          if (newId) {
            loadArticle();
          }
        }
    );

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
