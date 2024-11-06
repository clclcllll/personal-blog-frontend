<!--scr/components/common/Navbar.vue-->
<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- 网站 Logo -->
      <router-link to="/" class="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:scale-105">
        My Blog
      </router-link>

      <!-- 导航链接 -->
      <ul class="flex space-x-2 items-center">
        <li v-for="link in navLinks" :key="link.to">
          <router-link :to="link.to" class="text-gray-600 hover:text-blue-600 transition-colors duration-300 relative group px-4 py-2 no-underline">
            <span class="absolute inset-0 bg-blue-100 rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-100"></span>
            <span class="relative z-10">{{ link.text }}</span>
          </router-link>
        </li>
        <!-- 管理员链接 -->
        <li v-if="isAdmin">
          <router-link to="/admin" class="text-gray-600 hover:text-blue-600 transition-colors duration-300 relative group px-4 py-2 no-underline">
            <span class="absolute inset-0 bg-blue-100 rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-100"></span>
            <span class="relative z-10">管理后台</span>
          </router-link>
        </li>
      </ul>

      <!-- 搜索框 -->
      <div class="flex items-center relative">
        <div class="relative">
          <input
              type="text"
              v-model="keyword"
              placeholder="搜索..."
              @keyup.enter="search"
              class="w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
          />
          <button
              @click="search"
              class="absolute right-0 top-0 mt-1 mr-2 p-2 text-gray-600 hover:text-blue-500 transition-colors duration-300 ease-in-out focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 用户操作 -->
      <div class="flex items-center space-x-4">
        <template v-if="isAuthenticated">
          <span v-if="userInfo?.username" class="text-gray-600">欢迎，{{ userInfo.username }}</span>
          <button
              @click="logout"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            注销
          </button>
        </template>
        <template v-else>
          <router-link
              to="/login"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            登录
          </router-link>
          <router-link
              to="/register"
              @click.native="handleClick"
              class="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            注册
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const keyword = ref('');

const navLinks = [
  { to: '/', text: '首页' },
  { to: '/archive', text: '归档' },
  { to: '/categories', text: '分类' },
  { to: '/tags', text: '标签' },
  { to: '/about', text: '关于' },
];

const isAuthenticated = computed(() => store.getters['user/isAuthenticated']);
const userInfo = computed(() => store.state.user.userInfo);
const isAdmin = computed(() => isAuthenticated.value && userInfo.value.role === 'admin');

onMounted(() => {
  if (isAuthenticated.value && !userInfo.value.username) {
    store.dispatch('user/getUserInfo');
  }
});

const logout = () => store.dispatch('user/logout');

const search = () => {
  if (keyword.value.trim()) {
    router.push({ name: 'Search', query: { q: keyword.value.trim() } });
    keyword.value = '';
  }
};

const handleClick = () => {
  console.log('Router link clicked');
};
</script>

<style scoped>
.router-link-active {
  @apply text-blue-600;
}
</style>