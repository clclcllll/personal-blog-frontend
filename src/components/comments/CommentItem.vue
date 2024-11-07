<!-- src/components/comments/CommentItem.vue -->
<template>
  <div class="comment-item pt-4 border-t border-gray-200 relative group">
    <!-- 顶部信息（用户头像、名称和时间/位置） -->
    <div class="flex items-start mb-2">
      <img :src="`https://api.dicebear.com/9.x/glass/svg?seed=${comment.user.username}`" class="w-10 h-10 rounded-full mr-3" alt="User avatar">

      <div class="flex-1">
        <div class="flex items-center justify-between">
          <!-- 左侧：用户名和时间信息 -->
          <div class="flex items-center text-gray-500">
            <span class="font-semibold text-base text-gray-800 mr-2">{{ comment.user.username }}</span>

            <!-- 回复对象 -->
            <span v-if="replyToUsername" class="text-xs mr-2">
              回复 <span class="text-blue-500 text-xs">{{ replyToUsername }}</span>
            </span>

            <span class="text-xs text-gray-500 ">{{ formatDate(comment.createdAt) }}</span>
          </div>

          <!-- 右侧：Font Awesome 回复图标按钮 -->
          <button @click="showReply = !showReply" class="text-blue-500 ml-4">
            <i :class="['fa-solid', 'fa-reply', showReply ? 'text-blue-500' : 'text-gray-400']"></i>
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
        <button v-if="showInitial" @click="showLimited" class="text-gray-500 text-sm hover:text-blue-500 ">展开 {{ comment.replies.length }} 条回复</button>
        <button v-if="showLimitedReplies && comment.replies.length > 3" @click="expandAll" class="text-gray-500 text-sm hover:text-blue-500">全部展开</button>
        <button v-if="(!showInitial || showAllReplies || showLimitedReplies) && comment.replies.length >= 1" @click="collapse" class="text-gray-500 text-sm hover:text-blue-500">收起</button>
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