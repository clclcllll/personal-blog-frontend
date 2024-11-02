<!-- src/components/admin/ArticleManage.vue -->

<template>
  <div class="article-manage">
    <h2>文章管理</h2>
    <!-- 新建文章按钮 -->
    <button @click="openCreateModal">新建文章</button>

    <!-- 文章列表 -->
    <table class="article-table">
      <thead>
      <tr>
        <th>标题</th>
        <th>作者</th>
        <th>分类</th>
        <th>标签</th> <!-- 新增标签列 -->
        <th>发布时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="article in articles" :key="article._id">
        <td>{{ article.title }}</td>
        <td>{{ article.author.username }}</td>
        <td>{{ article.category.name }}</td>
        <td>
          <!-- 显示标签 -->
          <span v-for="tag in article.tags" :key="tag._id" class="tag">{{ tag.name }}</span>
        </td>
        <td>{{ formatDate(article.createdAt) }}</td>

        <td>
          <button @click="editArticle(article)">编辑</button>
          <button @click="deleteArticle(article._id)">删除</button>
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

    <!-- 创建/编辑文章模态框 -->
    <Modal v-model:visible="isModalVisible">
      <template #header>
        <h3>{{ isEditing ? '编辑文章' : '新建文章' }}</h3>
      </template>
      <div>
        <!-- 文章表单 -->
        <div class="form-group">
          <label for="title">标题</label>
          <input id="title" v-model="form.title" type="text" />
        </div>
        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" v-model="form.category">
            <option v-for="category in categories" :value="category._id" :key="category._id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="tags">标签</label>
          <select id="tags" v-model="form.tags" multiple>
            <option disabled value="">请选择标签</option>
            <option v-for="tag in tags" :value="tag._id" :key="tag._id">
              {{ tag.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="content">内容</label>
          <textarea id="content" v-model="form.content"></textarea>
        </div>
      </div>
      <template #footer>
        <button @click="isModalVisible = false">取消</button>
        <button @click="submitForm">{{ isEditing ? '保存' : '创建' }}</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { getArticles, createArticle, updateArticle, deleteArticle } from '@/api/article';
import { getCategories } from '@/api/category';
import { format } from 'date-fns';
import {createTag, deleteTag, getTags, updateTag} from '@/api/tag';
import Pagination from '@/components/common/Pagination.vue';
import Modal from '@/components/common/Modal.vue';
import {showMessage} from "@/utils/message.js";

export default {
  name: 'ArticleManage',
  components: {
    Pagination,
    Modal,
  },
  setup() {
    const articles = ref([]);
    const categories = ref([]);
    const tags = ref([]); // 添加标签列表
    const page = ref(1);
    const pages = ref(1);
    const isModalVisible = ref(false);
    const isEditing = ref(false);
    const currentArticleId = ref(null);



    const form = reactive({
      title: '',
      category: '',
      content: '',
      tags: [], // 添加标签字段
    });

    const loadArticles = async (pageNumber = 1) => {
      try {
        const response = await getArticles({ page: pageNumber, limit: 10 });
        articles.value = response.articles;
        page.value = response.page;
        pages.value = response.pages;
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    };

    const loadCategories = async () => {
      try {
        const response = await getCategories();
        categories.value = response.categories;
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    const loadTags = async () => {
      try {
        const response = await getTags();
        tags.value = response.tags;
      } catch (error) {
        console.error('Failed to load tags:', error);
      }
    };
    const openCreateModal = () => {
      isEditing.value = false;
      currentArticleId.value = null;
      form.title = '';
      form.category = '';
      form.tags = []; // 清空标签
      form.content = '';
      isModalVisible.value = true;
    };

    const editArticle = (article) => {
      isEditing.value = true;
      currentArticleId.value = article._id;
      form.title = article.title;
      form.category = article.category._id;
      form.tags = article.tags.map(tag => tag._id); // 加载已选中的标签
      form.content = article.content;
      isModalVisible.value = true;
    };

    // 提交表单
    const submitForm = async () => {
      try {
        if (isEditing.value) {
          await updateTag(currentTagId.value, { ...form });
        } else {
          await createTag({ ...form });
        }
        isModalVisible.value = false;
        await loadTags();
      } catch (error) {
        console.error('Failed to submit form:', error);
      }
    };

    // 删除文章
    const deleteArticleById = async (id) => {
      if (confirm('确定要删除这篇文章吗？')) {
        try {
          await deleteTag(id);
          await loadTags();
        } catch (error) {
          console.error('Failed to delete tag:', error);
        }
      }
    };

    const onPageChanged = (newPage) => {
      loadArticles(newPage);
    };

    const formatDate = (date) => {
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    };

    onMounted(() => {
      loadArticles();
      loadCategories();
      loadTags(); // 加载标签列表
    });

    return {
      articles,
      categories,
      tags, // 返回标签列表
      page,
      pages,
      isModalVisible,
      isEditing,
      form,
      openCreateModal,
      editArticle,
      submitForm,
      deleteArticle: deleteArticleById,
      onPageChanged,
      formatDate,
    };
  },
};
</script>

<style scoped>
.article-manage {
  padding: 20px;
}
.article-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.article-table th,
.article-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
