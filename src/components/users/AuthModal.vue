<!-- src/components/users/AuthModal.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
      <!-- 标题和关闭按钮 -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-center flex-1">{{ isLogin ? '用户登录' : '用户注册' }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition duration-300">
          <i class="fas fa-times"></i> <!-- 使用 Font Awesome 的关闭图标 -->
        </button>
      </div>

      <!-- Tab 切换登录或注册 -->
      <div class="flex justify-center mb-6 space-x-6">
        <span
            @click="isLogin = true"
            :class="isLogin ? 'bg-blue-100 text-blue-600' : 'text-gray-600'"
            class="px-4 py-2 rounded-lg cursor-pointer transition duration-300"
        >
          登录
        </span>
        <span
            @click="isLogin = false"
            :class="!isLogin ? 'bg-blue-100 text-blue-600' : 'text-gray-600'"
            class="px-4 py-2 rounded-lg cursor-pointer transition duration-300"
        >
          注册
        </span>
      </div>

      <!-- 登录表单 -->
      <form v-if="isLogin" @submit.prevent="onLoginSubmit" class="space-y-4">
        <div>
          <label for="loginEmail" class="block mb-1 text-gray-700">邮箱地址</label>
          <div class="relative">
            <input
                type="email"
                id="loginEmail"
                v-model.trim="email"
                required
                placeholder="请输入邮箱地址"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div>
          <label for="loginPassword" class="block mb-1 text-gray-700">密码</label>
          <div class="relative">
            <input
                type="password"
                id="loginPassword"
                v-model.trim="password"
                required
                placeholder="请输入密码"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <button type="submit" class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300">
          登录
        </button>
      </form>

      <!-- 注册表单 -->
      <form v-else @submit.prevent="onRegisterSubmit" class="space-y-4">
        <div>
          <label for="registerUsername" class="block mb-1 text-gray-700">用户名</label>
          <div class="relative">
            <input
                type="text"
                id="registerUsername"
                v-model.trim="username"
                required
                placeholder="请输入用户名"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div>
          <label for="registerEmail" class="block mb-1 text-gray-700">邮箱地址</label>
          <div class="relative">
            <input
                type="email"
                id="registerEmail"
                v-model.trim="email"
                required
                placeholder="请输入邮箱地址"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <i class="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div>
          <label for="registerPassword" class="block mb-1 text-gray-700">密码</label>
          <div class="relative">
            <input
                type="password"
                id="registerPassword"
                v-model.trim="password"
                required
                placeholder="请输入密码"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block mb-1 text-gray-700">确认密码</label>
          <div class="relative">
            <input
                type="password"
                id="confirmPassword"
                v-model.trim="confirmPassword"
                required
                placeholder="请再次输入密码"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <button type="submit" class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300">
          注册
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'AuthModal',
  props: {
    initialMode: {
      type: String,
      default: 'login', // 初始模式，默认为登录
    },
  },
  setup(props,{ emit }) {
    const isLogin = ref(true); // 是否为登录表单
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const store = useStore();
    const router = useRouter();

    const onLoginSubmit = async () => {
      try {
        await store.dispatch('user/login', { email: email.value, password: password.value });
        await router.push({ name: 'Home' });
        // 关闭模态窗口
        emit('close');
      } catch (error) {
        alert(error.response?.data?.error || '登录失败，请重试');
      }
    };

    const onRegisterSubmit = async () => {
      if (password.value !== confirmPassword.value) {
        alert('两次输入的密码不一致');
        return;
      }
      try {
        await store.dispatch('user/register', {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        alert('注册成功，请登录');
        isLogin.value = true; // 切换回登录表单
      } catch (error) {
        alert(error.response?.data?.error || '注册失败，请重试');
      }
    };

    const closeModal = () => emit('close');

    return {
      isLogin,
      username,
      email,
      password,
      confirmPassword,
      onLoginSubmit,
      onRegisterSubmit,
      closeModal,
      activeTabClass: 'bg-blue-600 text-white',
      inactiveTabClass: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    };
  },
};
</script>
