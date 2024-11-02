<!-- src/components/comments/CommentItem.vue -->

<template>
  <div class="comment-item">
    <div class="comment-header">
      <span class="username">{{ comment.user.username }}</span>
      <span class="date">{{ formatDate(comment.createdAt) }}</span>
    </div>
    <div class="comment-content">
      <p>{{ comment.content }}</p>
    </div>
    <!-- 回复按钮 -->
    <div class="comment-actions">
      <button @click="showReply = !showReply">
        {{ showReply ? '取消回复' : '回复' }}
      </button>
    </div>
    <!-- 回复表单 -->
    <CommentForm
        v-if="showReply"
        :articleId="comment.article"
        :parentId="comment._id"
        @comment-added="onReplyAdded"
    />
    <!-- 子评论 -->
    <div class="replies" v-if="comment.replies && comment.replies.length">
      <CommentItem
          v-for="reply in comment.replies"
          :key="reply._id"
          :comment="reply"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { format } from 'date-fns';
import CommentForm from './CommentForm.vue';

export default {
  name: 'CommentItem',
  components: {
    CommentForm,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showReply = ref(false);

    const formatDate = (date) => {
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    };

    const onReplyAdded = () => {
      showReply.value = false;
      // 可以在这里触发父组件重新加载评论列表
    };

    return {
      showReply,
      formatDate,
      onReplyAdded,
    };
  },
};
</script>

<style scoped>
.comment-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}
.comment-header {
  font-size: 14px;
  color: #666;
}
.username {
  font-weight: bold;
  margin-right: 10px;
}
.date {
  color: #999;
}
.comment-content {
  margin: 10px 0;
}
.comment-actions {
  margin-bottom: 10px;
}
.replies {
  margin-left: 20px;
  border-left: 2px solid #eee;
  padding-left: 10px;
}
</style>
