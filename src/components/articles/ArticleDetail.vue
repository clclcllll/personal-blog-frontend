<!-- src/components/articles/ArticleDetail.vue -->
<template>
  <div class="max-w-5xl mx-auto flex mt-20">
    <!-- 大纲 -->
    <!-- 大纲：固定在内容的左边并偏移 -->
    <!-- 大纲 -->
    <div
        class="w-64 hidden lg:block fixed transform -translate-x-1/2 duration-300 ease-in-out overflow-hidden"
        :class="{ 'top-20': !hideNav, 'top-2': hideNav }"
        :style="{ maxHeight: outlineMaxHeight + 'px',opacity: outlineOpacity }"
    > <!-- 大屏时显示大纲，设置固定宽度和偏移 -->
      <Outline :content="article.content" />
    </div>

    <div v-if="article && article.author" class="max-w-3xl mx-auto space-y-6">

      <!-- 标题 -->
      <h1 class="text-3xl font-bold text-gray-800">{{ article.title }}</h1>

      <!-- 作者、发布时间、阅读次数 -->
      <div class="flex items-center space-x-6 text-gray-500 text-sm">
        <span class="flex items-center gap-1">
          <i class="fas fa-user"></i> <!-- 用户图标 -->
          {{ article.author.username }}
        </span>

        <span class="flex items-center gap-1">
          <i class="fas fa-clock"></i> <!-- 时间图标 -->
          {{ formatDate(article.createdAt) }}
        </span>

        <span class="flex items-center gap-1">
          <i class="fas fa-eye"></i> <!-- 阅读图标 -->
          阅读：{{ article.views }} 次
        </span>
        <!-- 分类跳转 -->
        <span v-if="article.category" class="flex items-center gap-1">
          <i class="fas fa-folder"></i>
          <router-link :to="{ name: 'Categories', query: { selectedCategory: article.category._id } }" class="hover:text-blue-500">
            {{ article.category.name }}
          </router-link>
        </span>


        <!-- 标签跳转 -->
        <span v-if="article.tags && article.tags.length > 0" class="flex items-center gap-1">
          <i class="fas fa-tag"></i>
          <span class="flex gap-1">
            <router-link
                v-for="tag in article.tags"
                :key="tag._id"
                :to="{ name: 'Tags', query: { selectedTag: tag._id } }"
                class="hover:text-blue-500"
            >
              {{ tag.name }}
            </router-link>
          </span>
        </span>

      </div>

      <!-- 文章内容 -->
      <!--使用tailwind的prose类美化格式-->
      <!--使用 markdown-it md转 和 markdown-it-anchor 为每个标题生成 id -->
      <div class="prose max-w-none" v-html="renderedHtmlContent"></div>

      <!-- 点赞按钮 -->
      <div class="flex items-center space-x-4 mt-4">
        <button @click="toggleLike" class="hover:text-blue-500 transition-transform transform hover:scale-110 flex items-center gap-1"
            :class="liked ? 'text-blue-500' : 'text-gray-500'"
        >
          <i :class="liked ? 'fas fa-heart' : 'far fa-heart'"></i> <!-- 使用实心或空心的心形图标 -->
          <span>{{ article.likes }}</span>
        </button>
      </div>

      <!-- 评论列表 -->
      <!-- 评论区 -->
      <div ref="commentSection" class="comments-section">
        <CommentList :articleId="article._id" />
      </div>

    </div>

    <div v-else class="text-center text-gray-500 mt-16">加载中...</div>

  </div>



</template>



<script>
import { ref, onMounted, computed, watch,inject } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { format } from 'date-fns';
import CommentList from '@/components/comments/CommentList.vue';
import { likeArticle, unlikeArticle } from '@/api/like';
import Outline from "@/components/articles/Outline.vue";

import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

export default {
  name: 'ArticleDetail',
  components: {
    Outline,
    CommentList,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const commentSection = ref(null);
    const outlineMaxHeight = ref(window.innerHeight - 80); // 初始高度设置为视口高度减去一些间距
    const outlineOpacity = ref(1); // 初始为完全可见
    const hideNav = computed(() => store.getters['ui/hideNav']); // 从 Vuex 获取 hideNav 状态


    const liked = ref(false);
    // 使用计算属性绑定当前文章
    const article = computed(() => store.state.article.currentArticle);

    // 初始化 markdown-it 和 markdown-it-anchor 插件
    const markdownParser = new MarkdownIt({
      html: true,  // 启用 HTML 标签
      linkify: true, // 自动将 URL 转换为链接
    }).use(markdownItAnchor, {
      level: [1, 2, 3, 4, 5, 6], // 支持 h1 到 h6 级别标题
      slugify: (s) =>
          s.trim().toLowerCase().replace(/\s+/g, '-'), // 将标题内容生成 slug，用于 id
      permalink: true, // 为每个标题生成锚点链接
      permalinkSymbol: '#', // 锚点符号
      permalinkClass: 'anchor-link', // 自定义类名以便于样式控制
      permalinkBefore: false, // 锚点符号显示在标题前
    });

    // 使用计算属性将 Markdown 内容转换为 HTML
    const renderedHtmlContent = computed(() => {
      return article.value.content ? markdownParser.render(article.value.content) : '';
    });


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

    // 检测评论区位置并更新大纲的最大高度
    const handleScroll = () => {
      if (commentSection.value) {
        const commentTop = commentSection.value.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        // Set outlineMaxHeight to 0 when reaching the comments section
        outlineMaxHeight.value = commentTop <= window.innerHeight ? 0 : Math.min(window.innerHeight - 80, commentTop - 20);

        // 如果评论区进入视口，则逐渐消失
        if (commentTop < viewportHeight) {
          const ratio = commentTop / viewportHeight; // 计算进入视口的比例
          outlineOpacity.value = ratio; // 调整大纲透明度
        } else {
          outlineOpacity.value = 1;
        }

      }
      //如果尝试移出评论区则逐步显示大纲(不需要完全移出评论区)

    };


    onMounted(() => {
      loadArticle();

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // 初始计算
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
      renderedHtmlContent,
      hideNav,
      outlineMaxHeight,
      commentSection,
      outlineOpacity,
    };
  },
};
</script>
