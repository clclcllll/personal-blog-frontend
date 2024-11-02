<!-- src/components/common/Navbar.vue -->

<template>
  <nav class="navbar">
    <div class="container">
      <!-- 网站 Logo -->
      <router-link to="/" class="logo">My Blog</router-link>

      <!-- 导航链接 -->
      <ul class="nav-links">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/archive">归档</router-link></li>
        <li><router-link to="/categories">分类</router-link></li>
        <li><router-link to="/tags">标签</router-link></li>
        <li><router-link to="/about">关于</router-link></li>
      </ul>

      <!-- 搜索框 -->
      <div class="search-box">
        <input type="text" v-model="keyword" placeholder="搜索..." @keyup.enter="search" />
        <button @click="search">搜索</button>
      </div>

      <!-- 用户操作 -->
      <div class="user-actions">
        <template v-if="isAuthenticated">
          <span v-if="userInfo.username">欢迎，{{ userInfo.username }}</span>
          <button @click="logout">注销</button>
        </template>
        <template v-else>
          <router-link to="/login">登录</router-link>
          <router-link to="/register">注册</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      keyword: '',
    };
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'userInfo']),
  },
  methods: {
    ...mapActions('user', ['logout']),
    search() {
      if (this.keyword.trim()) {
        this.$router.push({ name: 'Search', query: { q: this.keyword.trim() } });
        this.keyword = '';
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.nav-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.nav-links li {
  margin: 0 15px;
}
.nav-links a {
  color: #333;
  text-decoration: none;
}
.search-box {
  display: flex;
  align-items: center;
}
.search-box input {
  padding: 5px;
}
.search-box button {
  padding: 5px 10px;
  margin-left: 5px;
}
.user-actions {
  display: flex;
  align-items: center;
}
.user-actions a,
.user-actions span,
.user-actions button {
  margin-left: 15px;
  color: #333;
  text-decoration: none;
}
.user-actions button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
