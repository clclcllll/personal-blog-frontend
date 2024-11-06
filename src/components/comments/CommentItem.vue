<!-- src/components/comments/CommentItem.vue -->
<template>
  <div class="comment-item pt-4 border-t border-gray-200 relative group">
    <!-- 顶部信息（用户头像、名称和时间/位置） -->
    <div class="flex items-start mb-2">
      <img :src="`https://api.dicebear.com/6.x/pixel-art/svg?seed=${comment.user.username}`" class="w-10 h-10 rounded-full mr-3" alt="User avatar">

      <div class="flex-1">
        <div class="flex items-center justify-between">
          <!-- 左侧：用户名和时间信息 -->
          <div class="flex items-center text-gray-500">
            <span class="font-semibold text-base text-gray-800 mr-2">{{ comment.user.username }}</span>

            <!-- 回复对象 -->
            <span v-if="replyToUsername" class="text-sm mr-2">
              回复 <span class="text-blue-500">{{ replyToUsername }}</span>
            </span>

            <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
          </div>

          <!-- 右侧：回复图标按钮在同一水平线 -->
          <button @click="showReply = !showReply" class="text-blue-500 ml-4">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#1296db">
              <path d="M511.3 925.8L408.8 758.7H192.2c-64.5 0-117-52.5-117-117V215.2c0-64.5 52.5-117 117-117h639.7c64.5 0 117 52.5 117 117v426.4c0 64.5-52.5 117-117 117H621.4L511.3 925.8zM192.2 145.7c-38.3 0-69.5 31.2-69.5 69.5v426.4c0 38.4 31.2 69.6 69.5 69.6h243.1l77.4 126.1 83.1-126.1h236c38.3 0 69.5-31.2 69.5-69.6V215.2c0-38.3-31.2-69.5-69.5-69.5H192.2z"></path>
              <path d="M292.1 435.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z"></path>
              <path d="M512 435.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z"></path>
              <path d="M731.9 435.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z"></path>
            </svg>
          </button>
        </div>

        <!-- 评论内容 -->
        <div class="text-gray-700 text-base mt-1">
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </div>

    <!-- 回复表单 -->
    <CommentForm
        v-if="showReply"
        :articleId="comment.article"
        :parentId="comment._id"
        :parentUsername="comment.user.username"
        @comment-added="onReplyAdded"
        class="mt-4 ml-4"
    />

    <!-- 子评论，缩小间距 -->
    <div class="border-l-2 border-gray-200 ml-4 mt-2 pl-4 space-y-2" v-if="comment.replies && comment.replies.length">
      <CommentItem
          v-for="reply in displayedReplies"
          :key="reply._id"
          :comment="reply"
          :replyToUsername="reply.replyToUsername"
          @comment-added="$emit('comment-added')"
      />
      <div class="flex space-x-2 mt-2 items-center">
        <span class="w-6 border-t border-gray-200"></span>
        <button v-if="showInitial" @click="showLimited" class="text-blue-500 text-sm">展开 {{ comment.replies.length }} 条回复</button>
        <button v-if="showLimitedReplies && comment.replies.length > 3" @click="expandAll" class="text-blue-500 text-sm">全部展开</button>
        <button v-if="(!showInitial || showAllReplies || showLimitedReplies) && comment.replies.length >= 1" @click="collapse" class="text-gray-500 text-sm">收起</button>
      </div>
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


