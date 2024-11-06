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

        <!-- 导出部分注销图标的样式 -->
        <template v-if="isAuthenticated">
          <span v-if="userInfo?.username" class="text-gray-600">欢迎，{{ userInfo.username }}</span>
          <!-- 注销图标按钮 -->
          <button
              @click="logout"
              class="text-gray-600 hover:text-red-600 transition duration-300 ease-in-out focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2h-3a2 2 0 01-2-2V7a2 2 0 012-2h3a2 2 0 012 2v1" />
            </svg>
          </button>

        </template>


        <template v-else>
          <!-- 账户图标触发模态窗口 -->
          <button @click="openAuthModal('login')" class="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </template>

      </div>
    </div>

    <!-- 引入 AuthModal 模态窗口 -->
    <AuthModal v-if="showAuthModal" :initial-mode="authModalMode" @close="showAuthModal = false" />
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AuthModal from '@/components/users/AuthModal.vue';

const store = useStore();
const router = useRouter();
const keyword = ref('');

const showAuthModal = ref(false); // 控制 AuthModal 的显示状态
const authModalMode = ref('login'); // 控制 AuthModal 的初始模式


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

// 切换 AuthModal 的显示并设置模式
const openAuthModal = (mode) => {
  authModalMode.value = mode;
  showAuthModal.value = true;
};

</script>

<style scoped>
.router-link-active {
  @apply text-blue-600;
}
</style>