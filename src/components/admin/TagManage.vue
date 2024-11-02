<!-- src/components/admin/TagManage.vue -->

<template>
  <div class="tag-manage">
    <h2>标签管理</h2>
    <!-- 新建标签按钮 -->
    <button @click="openCreateModal">新建标签</button>

    <!-- 标签列表 -->
    <table class="tag-table">
      <thead>
      <tr>
        <th>名称</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tag in tags" :key="tag._id">
        <td>{{ tag.name }}</td>
        <td>
          <button @click="editTag(tag)">编辑</button>
          <button @click="deleteTag(tag._id)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- 创建/编辑标签模态框 -->
    <Modal v-model:visible="isModalVisible">
      <template #header>
        <h3>{{ isEditing ? '编辑标签' : '新建标签' }}</h3>
      </template>
      <div>
        <!-- 标签表单 -->
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
import { getTags, createTag, updateTag, deleteTag } from '@/api/tag';
import Modal from '@/components/common/Modal.vue';

export default {
  name: 'TagManage',
  components: {
    Modal,
  },
  setup() {
    const tags = ref([]);
    const isModalVisible = ref(false);
    const isEditing = ref(false);
    const currentTagId = ref(null);

    const form = reactive({
      name: '',
    });

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
      currentTagId.value = null;
      form.name = '';
      isModalVisible.value = true;
    };

    const editTag = (tag) => {
      isEditing.value = true;
      currentTagId.value = tag._id;
      form.name = tag.name;
      isModalVisible.value = true;
    };

    const submitForm = async () => {
      try {
        if (isEditing.value) {
          await updateTag(currentTagId.value, { ...form });
        } else {
          await createTag({ ...form });
        }
        isModalVisible.value = false;
        loadTags();
      } catch (error) {
        console.error('Failed to submit form:', error);
      }
    };

    const deleteTagById = async (id) => {
      if (confirm('确定要删除这个标签吗？')) {
        try {
          await deleteTag(id);
          loadTags();
        } catch (error) {
          console.error('Failed to delete tag:', error);
        }
      }
    };

    onMounted(() => {
      loadTags();
    });

    return {
      tags,
      isModalVisible,
      isEditing,
      form,
      openCreateModal,
      editTag,
      submitForm,
      deleteTag: deleteTagById,
    };
  },
};
</script>

<style scoped>
.tag-manage {
  padding: 20px;
}
.tag-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.tag-table th,
.tag-table td {
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
