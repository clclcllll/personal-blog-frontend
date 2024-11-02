<!-- src/components/admin/CategoryManage.vue -->

<template>
  <div class="category-manage">
    <h2>分类管理</h2>
    <!-- 新建分类按钮 -->
    <button @click="openCreateModal">新建分类</button>

    <!-- 分类列表 -->
    <table class="category-table">
      <thead>
      <tr>
        <th>名称</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category._id">
        <td>{{ category.name }}</td>
        <td>
          <button @click="editCategory(category)">编辑</button>
          <button @click="deleteCategory(category._id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- 创建/编辑分类模态框 -->
    <Modal v-model:visible="isModalVisible">
      <template #header>
        <h3>{{ isEditing ? '编辑分类' : '新建分类' }}</h3>
      </template>
      <div>
        <!-- 分类表单 -->
        <div class="form-group">
          <label for="name">名称</label>
          <input id="name" v-model="form.name" type="text" />
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
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/api/category';
import Modal from '@/components/common/Modal.vue';

export default {
  name: 'CategoryManage',
  components: {
    Modal,
  },
  setup() {
    const categories = ref([]);
    const isModalVisible = ref(false);
    const isEditing = ref(false);
    const currentCategoryId = ref(null);

    const form = reactive({
      name: '',
    });

    const loadCategories = async () => {
      try {
        const response = await getCategories();
        categories.value = response.categories;
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    const openCreateModal = () => {
      isEditing.value = false;
      currentCategoryId.value = null;
      form.name = '';
      isModalVisible.value = true;
    };

    const editCategory = (category) => {
      isEditing.value = true;
      currentCategoryId.value = category._id;
      form.name = category.name;
      isModalVisible.value = true;
    };

    const submitForm = async () => {
      try {
        if (isEditing.value) {
          await updateCategory(currentCategoryId.value, { ...form });
        } else {
          await createCategory({ ...form });
        }
        isModalVisible.value = false;
        loadCategories();
      } catch (error) {
        console.error('Failed to submit form:', error);
      }
    };

    const deleteCategoryById = async (id) => {
      if (confirm('确定要删除这个分类吗？')) {
        try {
          await deleteCategory(id);
          loadCategories();
        } catch (error) {
          console.error('Failed to delete category:', error);
        }
      }
    };

    onMounted(() => {
      loadCategories();
    });

    return {
      categories,
      isModalVisible,
      isEditing,
      form,
      openCreateModal,
      editCategory,
      submitForm,
      deleteCategory: deleteCategoryById,
    };
  },
};
</script>

<style scoped>
.category-manage {
  padding: 20px;
}
.category-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.category-table th,
.category-table td {
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
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
