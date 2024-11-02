<!-- src/components/admin/UserManage.vue -->

<template>
  <div class="user-manage">
    <h2>用户管理</h2>

    <!-- 用户列表 -->
    <table class="user-table">
      <thead>
      <tr>
        <th>用户名</th>
        <th>邮箱</th>
        <th>角色</th>
        <th>注册时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>{{ formatDate(user.createdAt) }}</td>
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
import { getUsers } from '@/api/user';
import Pagination from '@/components/common/Pagination.vue';
import { format } from 'date-fns';

export default {
  name: 'UserManage',
  components: {
    Pagination,
  },
  setup() {
    const users = ref([]);
    const page = ref(1);
    const pages = ref(1);

    const loadUsers = async (pageNumber = 1) => {
      try {
        const response = await getUsers({ page: pageNumber, limit: 10 });
        users.value = response.users;
        page.value = response.page;
        pages.value = response.pages;
        //显示page和pages
          console.log(page.value,pages.value);
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };

    const onPageChanged = (newPage) => {
      loadUsers(newPage);
    };

    const formatDate = (date) => {
      return format(new Date(date), 'yyyy-MM-dd HH:mm');
    };

    onMounted(() => {
      loadUsers();
    });

    return {
      users,
      page,
      pages,
      onPageChanged,
      formatDate,
    };
  },
};
</script>

<style scoped>
.user-manage {
  padding: 20px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.user-table th,
.user-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>
