<template>
  <nav
      class="bg-white shadow-md fixed top-0 w-full z-50 transition-transform duration-500 ease-in-out"
      :class="{ '-translate-y-full': hideNav }"
  >
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
              class="absolute right-0 top-0 mt-0.5 mr-2 p-2 text-gray-600 hover:text-blue-500 transition-colors duration-300 ease-in-out focus:outline-none"
          >
            <i class="fas fa-search"></i> <!-- 替换为 Font Awesome 搜索图标 -->
          </button>
        </div>
      </div>

      <!-- 用户操作 -->
      <div class="flex items-center space-x-4">
        <template v-if="isAuthenticated">
          <!-- 头像和用户名 -->
          <div class="flex items-center space-x-2">
            <img :src="`https://api.dicebear.com/9.x/glass/svg?seed=${userInfo.username}`" class="w-8 h-8 rounded-full" alt="User avatar">
            <span class="text-gray-600">{{ userInfo.username }}</span>
          </div>
          <!-- 注销图标按钮 -->
          <button
              @click="logout"
              class="text-gray-600 hover:text-red-600 transition duration-300 ease-in-out focus:outline-none"
          >
            <i class="fas fa-sign-out-alt"></i> <!-- 替换为 Font Awesome 注销图标 -->
          </button>
        </template>

        <template v-else>
          <!-- 账户图标触发模态窗口 -->
          <button @click="openAuthModal('login')" class="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out focus:outline-none">
            <i class="fas fa-user"></i> <!-- 替换为 Font Awesome 用户图标 -->
          </button>
        </template>
      </div>
    </div>

    <!-- 引入 AuthModal 模态窗口 -->
    <AuthModal v-if="showAuthModal" :initial-mode="authModalMode" @close="showAuthModal = false" />
  </nav>
</template>

<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import AuthModal from '@/components/users/AuthModal.vue';

const store = useStore();
const router = useRouter();
const keyword = ref('');

const showAuthModal = ref(false); // 控制 AuthModal 的显示状态
const authModalMode = ref('login'); // 控制 AuthModal 的初始模式

const navLinks = [
  {to: '/', text: '首页'},
  {to: '/archive', text: '归档'},
  {to: '/categories', text: '分类'},
  {to: '/tags', text: '标签'},
  {to: '/about', text: '关于'},
];

const isAuthenticated = computed(() => store.getters['user/isAuthenticated']);
const userInfo = computed(() => store.state.user.userInfo);
const isAdmin = computed(() => isAuthenticated.value && userInfo.value.role === 'admin');

let lastScroll = window.scrollY;
const hideNav = ref(false); // 控制导航栏显示状态
let scrollUpCount = 0;

const handleScroll = () => {
  const currentScroll = window.scrollY;

  if (currentScroll === 0) {
    hideNav.value = false; // 页面滚动到顶部时显示导航栏
    scrollUpCount = 0;
  } else if (currentScroll > lastScroll) {
    hideNav.value = true; // 向下滚动时隐藏导航栏
    scrollUpCount = 0; // 重置向上滚动计数
  } else {
    scrollUpCount += 1;
    if (scrollUpCount >= 2) {
      hideNav.value = false; // 向上滚动两次时显示导航栏
    }
  }
  lastScroll = currentScroll;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  if (isAuthenticated.value && !userInfo.value.username) {
    store.dispatch('user/getUserInfo');
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

const logout = () => store.dispatch('user/logout');

const search = () => {
  if (keyword.value.trim()) {
    router.push({name: 'Search', query: {q: keyword.value.trim()}});
    keyword.value = '';
  }
};

const openAuthModal = (mode) => {
  authModalMode.value = mode;
  showAuthModal.value = true;
};

</script>
