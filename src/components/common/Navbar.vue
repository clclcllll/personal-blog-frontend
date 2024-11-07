<template>
  <nav
      class="shadow-md fixed top-0 w-full z-50 transition-transform duration-480 ease-in-out"
      :class="[
        hideNav ? '-translate-y-full' : 'translate-y-0',
        isHomePage && atTop ? 'bg-gradient-to-br from-black-900 to-blue-100 text-white bg-opacity-70' : 'bg-white text-gray-800'
      ]"
  >
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <!-- 网站 Logo -->
      <router-link to="/" class="text-2xl font-bold hover:text-blue-500 transition-colors duration-300 transform hover:scale-105">
        My Blog
      </router-link>

      <!-- 导航链接 -->
      <ul class="flex space-x-2 items-center">
        <li v-for="link in navLinks" :key="link.to">
          <router-link
              :to="link.to"
              :class="[
        'transition-colors duration-300 relative group px-4 py-2 no-underline',
        isHomePage && atTop ? 'hover:text-white' : 'hover:text-white'
      ]"
          >
      <span
          :class="[
          'absolute inset-0 rounded-full transform scale-0 transition-transform duration-50 group-hover:scale-100',
          isHomePage && atTop ? 'bg-blue-400 bg-opacity-30' : 'bg-blue-500'
        ]"
      ></span>
            <span class="relative z-10">{{ link.text }}</span>
          </router-link>
        </li>

        <!-- 管理员链接 -->
        <li v-if="isAdmin">
          <router-link
              to="/admin"
              :class="[
        'transition-colors duration-300 relative group px-4 py-2 no-underline',
        isHomePage && atTop ? 'hover:text-white' : 'hover:text-white'
      ]"
          >
      <span
          :class="[
          'absolute inset-0 rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-100',
          isHomePage && atTop ? 'bg-blue-400 bg-opacity-30' : 'bg-blue-500'
        ]"
      ></span>
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
              placeholder="搜索"
              @keyup.enter="search"
              :class="[
          'w-64 pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ease-in-out',
          isHomePage && atTop ? 'text-xs bg-gray-800 bg-opacity-25 text-white-200 border-gray-600 focus:ring-blue-400' : 'bg-white text-gray-700 border-gray-300 focus:ring-blue-500'
        ]"
          />
          <button
              @click="search"
              :class="isHomePage && atTop ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'"
              class="absolute right-0 top-0 mt-0.5 mr-2 p-2 transition-colors duration-300 ease-in-out focus:outline-none"
          >
            <i class="fas fa-search"></i> <!-- Font Awesome 搜索图标 -->
          </button>
        </div>
      </div>



      <!-- 用户操作 -->
      <div class="flex items-center space-x-4">
        <template v-if="isAuthenticated">
          <!-- 头像和用户名 -->
          <div class="flex items-center space-x-2">
            <img :src="`https://api.dicebear.com/9.x/glass/svg?seed=${userInfo.username}`" class="w-8 h-8 rounded-full" alt="User avatar">
            <span>{{ userInfo.username }}</span>
          </div>
          <!-- 注销图标按钮 -->
          <button
              @click="logout"
              class="hover:text-red-600 transition duration-300 ease-in-out focus:outline-none"
          >
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </template>

        <template v-else>
          <!-- 账户图标触发模态窗口 -->
          <button @click="openAuthModal('login')" class="hover:text-blue-600 transition duration-300 ease-in-out focus:outline-none">
            <i class="fas fa-user"></i>
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

const atTop = ref(true);
const isHomePage = computed(() => router.currentRoute.value.name === 'Home');
const handleScroll = () => {
  const currentScroll = window.scrollY;

  if (currentScroll === 0) {
    hideNav.value = false;
    scrollUpCount = 0;
    atTop.value = true; // 页面在顶部
  } else {
    atTop.value = false;
    if (currentScroll > lastScroll) {
      hideNav.value = true; // 向下滚动时隐藏导航栏
      scrollUpCount = 0;
    } else {
      scrollUpCount += 1;
      if (scrollUpCount >= 15) {
        hideNav.value = false;
      }
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
