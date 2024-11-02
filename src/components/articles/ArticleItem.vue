<!-- src/components/articles/ArticleItem.vue -->

<template>
  <div class="article-item">
    <h2>
      <router-link :to="{ name: 'ArticleDetail', params: { id: article._id } }">
        {{ article.title }}
      </router-link>
    </h2>
    <div class="meta">
      <span>作者：{{ article.author.username }}</span>
      <span>发布时间：{{ formatDate(article.createdAt) }}</span>
      <span>分类：<router-link :to="{ name: 'Category', params: { id: article.category._id } }">{{ article.category.name }}</router-link></span>
      <span>阅读：{{ article.views }} 次</span>
    </div>
    <p class="summary">{{ article.summary }}</p>
    <div class="tags">
      <span v-for="tag in article.tags" :key="tag._id" class="tag">
        <router-link :to="{ name: 'Tag', params: { id: tag._id } }">{{ tag.name }}</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    },
  },
};
</script>

<style scoped>
.article-item {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}
.article-item h2 {
  margin: 0;
}
.meta {
  font-size: 14px;
  color: #999;
}
.meta span {
  margin-right: 15px;
}
.summary {
  margin: 15px 0;
  color: #555;
}
.tags {
  margin-top: 10px;
}
.tag {
  display: inline-block;
  margin-right: 10px;
}
.tag a {
  color: #42b983;
  text-decoration: none;
}
</style>
