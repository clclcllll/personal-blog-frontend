<!-- src/components/comments/CommentItem.vue -->

<template>
  <div class="comment-item">
    <div class="comment-header">
      <span class="username">{{ comment.user.username }}</span>
      <span class="date">{{ formatDate(comment.createdAt) }}</span>
    </div>
    <div class="comment-content">
      <!-- 仅在回复二级或更深层评论时显示 -->
      <p v-if="replyToUsername">{{ `回复 @${replyToUsername}` }}</p>
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
        :parentUsername="comment.user.username"
        @comment-added="onReplyAdded"
    />
    <!-- 子评论显示在同一层级 -->
    <div class="replies" v-if="comment.replies && comment.replies.length">
      <CommentItem
          v-for="reply in displayedReplies"
          :key="reply._id"
          :comment="reply"
          :replyToUsername="reply.replyToUsername"
          @comment-added="$emit('comment-added')"
      /><!-- emit事件冒泡继续向父组件传递 -->
      <!-- 按钮控制 -->
      <button v-if="showInitial" @click="showLimited">展开</button>
      <button v-if="showLimitedReplies && comment.replies.length > 3" @click="expandAll">
        全部展开
      </button>
      <button v-if="(!showInitial || showAllReplies || showLimitedReplies) && comment.replies.length >=1" @click="collapse">
        收起
      </button>
    </div>
  </div>
</template>

<script>
import {ref, computed, watch} from 'vue';
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
    replyToUsername: { // 用于标注回复对象的用户名
      type: String,
      default: '',
    },
  },
  setup(props,{ emit }) {
    const showReply = ref(false);
    const showAllReplies = ref(false);
    const showLimitedReplies = ref(false);
    const showInitial = ref(true); // 初始折叠状态

    const formatDate = (date) => {
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    };

    const onReplyAdded = () => {
      showReply.value = false;
      emit('comment-added'); // 向父组件触发更新事件
    };

    const displayedReplies = computed(() => {
      if (showAllReplies.value) {// 全部展开
        return props.comment.replies;
      } else if (showLimitedReplies.value) {// 展开部分
        return props.comment.replies.slice(0, 3);
      }
      return [];
    });

    const showLimited = () => {
      showInitial.value = false;
      showLimitedReplies.value = true;
    };

    const expandAll = () => {
      showLimitedReplies.value = false;
      showAllReplies.value = true;
    };

    const collapse = () => {
      showAllReplies.value = false;
      showLimitedReplies.value = false;
      showInitial.value = true;
    };

    return {
      showReply,
      showInitial,
      showLimitedReplies,
      showAllReplies,
      formatDate,
      onReplyAdded,
      displayedReplies,
      showLimited,
      expandAll,
      collapse,
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
.replies button {
  background: none;
  border: none;
  color: #42b983;
  cursor: pointer;
  padding: 5px 0;
}
</style>
