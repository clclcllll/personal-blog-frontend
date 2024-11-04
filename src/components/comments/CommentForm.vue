<!-- src/components/comments/CommentForm.vue -->

<template>
  <div class="comment-form">
    <textarea
        v-model="content"
        placeholder="请输入评论内容"
        rows="3"
    ></textarea>
    <button @click="submitComment">提交评论</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { addComment } from '@/api/comment';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

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
  },
  emits: ['comment-added'],
  setup(props, { emit }) {
    const content = ref('');
    const store = useStore();
    const router = useRouter();

    const submitComment = async () => {
      if (!store.getters['user/isAuthenticated']) {
        alert('请先登录再发表评论');
        //router.push({ name: 'Login' });
        return;
      }
      if (!content.value.trim()) {
        alert('评论内容不能为空');
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

        await addComment(payload);

        content.value = '';
        emit('comment-added');
      } catch (error) {
        //alert(error.response.data.error || '评论提交失败');
      }
    };

    return {
      content,
      submitComment,
    };
  },
};
</script>

<style scoped>
.comment-form {
  margin-top: 20px;
}
.comment-form textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  resize: vertical;
  margin-bottom: 10px;
}
.comment-form button {
  padding: 8px 16px;
}
</style>
