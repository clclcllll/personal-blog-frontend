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
        <!-- 管理员链接 -->
        <li v-if="isAdmin"><router-link to="/admin">管理后台</router-link></li>
      </ul>

      <!-- 搜索框 -->
      <div class="search-box">
        <input type="text" v-model="keyword" placeholder="搜索..." @keyup.enter="search" />
        <button @click="search">搜索</button>
      </div>

      <!-- 用户操作 -->
      <div class="user-actions">
        <template v-if="isAuthenticated">
          <span v-if="userInfo?.username">欢迎，{{ userInfo.username }}</span>
          <button @click="logout">注销</button>
        </template>
        <template v-else>
          <router-link to="/login">登录</router-link>
          <router-link to="/register" @click.native="handleClick">注册</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex';
import {computed, onMounted, ref, watch} from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const store = useStore();
    const router = useRouter();
    const keyword = ref('');

    // 使用 computed 从 store 获取数据
    const isAuthenticated = computed(() => store.getters['user/isAuthenticated']);
    const userInfo = computed(() => store.state.user.userInfo);
    const isAdmin = computed(() => isAuthenticated.value && userInfo.value.role === 'admin');


    // 检查用户信息是否已存在，否则获取
    onMounted(() => {
      if (isAuthenticated.value && !userInfo.value.username) {
        store.dispatch('user/getUserInfo');
      }
    });

    // 调用 store 的 logout action
    const logout = () => store.dispatch('user/logout');

    // 搜索功能
    const search = () => {
      if (keyword.value.trim()) {
        router.push({ name: 'Search', query: { q: keyword.value.trim() } });
        keyword.value = '';
      }
    };


    // 注册按钮点击处理
    const handleClick = () => {
      console.log('Router link clicked');
    };

    return {
      keyword,
      isAuthenticated,
      userInfo,
      isAdmin,
      logout,
      search,
      handleClick,
    };
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
