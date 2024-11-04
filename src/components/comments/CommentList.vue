<template>
  <div class="comment-section">
    <h3>{{ total }} 条评论</h3>
    <div class="comments">
      <CommentItem
          v-for="comment in comments"
          :key="comment._id"
          :comment="comment"
          :replyToUsername="''"
          @comment-added="onCommentAdded"
      />
    </div>
    <Pagination :currentPage="page" :totalPages="pages" @page-changed="onPageChanged" />
    <CommentForm :articleId="articleId" @comment-added="onCommentAdded" />
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
import CommentItem from './CommentItem.vue';
import CommentForm from './CommentForm.vue';
import Pagination from '@/components/common/Pagination.vue';

export default {
  name: 'CommentList',
  components: { CommentItem, CommentForm, Pagination },
  props: {
    articleId: { type: String, required: true },
  },
  setup(props) {
    const store = useStore();
    const comments = computed(() => store.state.comment.comments);
    const total = computed(() => store.state.comment.total);
    const page = computed(() => store.state.comment.page);
    const pages = computed(() => store.state.comment.pages);
    const currentPage = ref(1);

    const loadComments = async (pageNum = 1) => {
      try {
        await store.dispatch('comment/fetchComments', {
          articleId: props.articleId,
          page: pageNum,
          limit: 10,
        });
      } catch (error) {
        console.error('加载评论失败：', error);
      }
    };

    const onPageChanged = (newPage) => {
      currentPage.value = newPage;
      loadComments(newPage);
    };

    const onCommentAdded = () => {
      loadComments(currentPage.value); // 重新加载当前页的评论
    };

    onMounted(() => {
      loadComments();
    });

    watch(() => props.articleId, () => {
      loadComments();
    });

    return {
      comments,
      total,
      page,
      pages,
      currentPage,
      onPageChanged,
      onCommentAdded,
    };
  },
};
</script>
