<!-- src/components/articles/ArticleItem.vue -->

<template>
  <div class="border-b pb-8">
    <!-- 第一行：文章标题 -->
    <h2 class="text-2xl font-semibold">
      <router-link
          :to="{ name: 'ArticleDetail', params: { id: article._id } }"
          class="text-gray-800 hover:text-blue-500 transition-transform duration-300 transform hover:scale-105"
      >
        {{ article.title }}
      </router-link>
    </h2>
    <!-- 第二行：图标 + 作者、发布时间、分类、标签 -->
    <div class="text-gray-600 text-sm flex flex-wrap gap-4 mt-2 items-center">
      <!-- 作者图标和名字 -->
      <span class="flex items-center gap-1">
        <i class="fas fa-user"></i> <!-- 用户图标 -->
        {{ article.author.username }}
      </span>

      <!-- 时间图标和发布时间 -->
      <span class="flex items-center gap-1">
        <i class="fas fa-clock"></i> <!-- 时间图标 -->
        {{ formatDate(article.createdAt) }}
      </span>

      <!-- 阅读次数 -->
      <span class="flex items-center gap-1">
        <i class="fas fa-eye"></i> <!-- 阅读图标 -->
        阅读：{{ article.views }} 次
      </span>

      <!-- 分类图标和分类名称（如果有） -->
      <span v-if="article.category" class="flex items-center gap-1">
        <i class="fas fa-folder"></i> <!-- 文件夹图标 -->
        <router-link :to="{ name: 'Category', params: { id: article.category._id } }" class="hover:text-blue-500">
          {{ article.category.name }}
        </router-link>
      </span>

      <!-- 标签图标和标签列表（如果有） -->
      <span v-if="article.tags && article.tags.length > 0" class="flex items-center gap-1">
        <i class="fas fa-tag"></i> <!-- 标签图标 -->
        <span class="flex gap-1">
          <router-link v-for="tag in article.tags" :key="tag._id" :to="{ name: 'Tag', params: { id: tag._id } }" class="hover:text-blue-500">
            {{ tag.name }}
          </router-link>
        </span>
      </span>
    </div>

    <!-- 文章摘要 -->
    <p class="text-gray-700 mt-4">{{ article.summary }}</p>

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
