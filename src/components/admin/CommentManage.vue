<template>
  <div class="comment-manage">
    <h2>评论管理</h2>
    <!-- 全部删除按钮 -->
    <button @click="deleteAllComments" class="delete-all-button">全部删除</button>

    <!-- 评论列表 -->
    <table class="comment-table">
      <thead>
      <tr>
        <th>评论内容</th>
        <th>作者</th>
        <th>所属文章</th>
        <th>发布时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="comment in comments" :key="comment._id">
        <td>{{ comment.content }}</td>
        <td>{{ comment.user.username }}</td>
        <td>{{ comment.article.title }}</td>
        <td>{{ formatDate(comment.createdAt) }}</td>
        <td>
          <button @click="deleteComment(comment._id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- 分页器 -->
    <Pagination
        :currentPage="page"
        :totalPages="pages"
        @page-changed="onPageChanged"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAllComments, deleteComment } from '@/api/comment';
import Pagination from '@/components/common/Pagination.vue';
import { format } from 'date-fns';

export default {
  name: 'CommentManage',
  components: {
    Pagination,
  },
  setup() {
    const comments = ref([]);
    const page = ref(1);
    const pages = ref(1);

    const loadComments = async (pageNumber = 1) => {
      try {
        const response = await getAllComments({page: pageNumber, limit: 10});
        comments.value = response.comments;
        page.value = response.page;
        pages.value = response.pages;
      } catch (error) {
        console.error('Failed to load comments:', error);
      }
    };

    const deleteCommentById = async (id) => {
      if (confirm('确定要删除这条评论吗？')) {
        try {
          await deleteComment(id);
          loadComments(page.value);
        } catch (error) {
          console.error('Failed to delete comment:', error);
        }
      }
    };

    // 新增全部删除功能
    const deleteAllComments = async () => {
      if (confirm('确定要删除当前页面的所有评论吗？')) {
        try {
          for (const comment of comments.value) {
            await deleteComment(comment._id);
          }
          loadComments(page.value);
        } catch (error) {
          console.error('Failed to delete all comments:', error);
        }
      }
    };

    const onPageChanged = (newPage) => {
      loadComments(newPage);
    };

    const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm');

    onMounted(() => {
      loadComments();
    });

    return {
      comments,
      page,
      pages,
      deleteComment: deleteCommentById,
      deleteAllComments, // 新增的全部删除方法
      onPageChanged,
      formatDate,
    };
  },
};
</script>

<style scoped>
.comment-manage {
  padding: 20px;
}

.comment-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.comment-table th,
.comment-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.delete-all-button {
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}

.delete-all-button:hover {
  background-color: darkred;
}
</style>
