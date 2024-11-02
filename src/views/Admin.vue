<!-- src/views/Admin.vue -->

<template>
  <div class="admin-page">
    <div class="sidebar">
      <ul>
        <li>
          <router-link to="/admin">仪表盘</router-link>
        </li>
        <li>
          <router-link to="/admin/articles">文章管理</router-link>
        </li>
        <li>
          <router-link to="/admin/comments">评论管理</router-link>
        </li>
        <li>
          <router-link to="/admin/categories">分类管理</router-link>
        </li>
        <li>
          <router-link to="/admin/tags">标签管理</router-link>
        </li>
        <li>
          <router-link to="/admin/users">用户管理</router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
};
</script>

<style scoped>
.admin-page {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 200px;
  background-color: #2d3a4b;
  color: #fff;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 0;
}
.sidebar a {
  display: block;
  padding: 15px;
  color: #fff;
  text-decoration: none;
}
.sidebar a.router-link-exact-active {
  background-color: #1a2332;
}
.content {
  flex: 1;
  padding: 20px;
}
</style>
