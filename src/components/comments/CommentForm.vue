<!-- src/components/comments/CommentForm.vue -->
<template>
  <div class="comment-form mt-6">
    <textarea
        v-model="content"
        :placeholder="placeholder"
        rows="3"
        class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out shadow-sm"
    ></textarea>
    <div class="flex justify-end mt-2">
      <button
          @click="submitComment"
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
      >
        <i class="fas fa-paper-plane"></i> <!-- 发送图标 -->
        <span class="sr-only">提交评论</span> <!-- 隐藏的文字用于无障碍访问 -->
      </button>
    </div>
  </div>
</template>


<script>
import {computed, ref} from 'vue';
import { addComment } from '@/api/comment';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {ElMessage} from "element-plus";

export default {
  name: 'CommentForm',
  props: {
    articleId: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: null,
    },
    parentUsername: { // 新增 prop，用于标注回复对象的用户名
      type: String,
      default: '',
    },
  },
  emits: ['comment-added'],
  setup(props, { emit }) {
    const content = ref('');
    const store = useStore();
    const router = useRouter();

    const placeholder = computed(() => {
      if (props.parentUsername) {
        return `回复 ${props.parentUsername}:`;
      }
      return '请输入评论内容';
    });


    const submitComment = async () => {
      if (!store.getters['user/isAuthenticated']) {
        ElMessage.warning('请先登录再发表评论');
        //router.push({ name: 'Login' });
        return;
      }
      if (!content.value.trim()) {
        ElMessage.warning('评论内容不能为空');
        return;
      }
      try {
        //
        const payload = {
          articleId: props.articleId,
          content: content.value.trim(),
        };

        if (props.parentId) {
          payload.parentId = props.parentId;
        }

        const response = await addComment(payload);

        content.value = '';

        emit('comment-added');

      } catch (error) {
        //alert(error.response.data.error || '评论提交失败');
      }
    };

    return {
      content,
      submitComment,
      placeholder,
    };
  },
};
</script>
