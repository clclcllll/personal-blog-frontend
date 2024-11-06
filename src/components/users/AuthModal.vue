<!-- src/components/users/AuthModal.vue -->

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-center flex-1">{{ isLogin ? '用户登录' : '用户注册' }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Tab 切换登录或注册 -->
      <div class="flex justify-center mb-6 space-x-6">
        <span
            @click="isLogin = true"
            :class="isLogin ? activeTabClass : inactiveTabClass"
            class="px-4 py-2 rounded-lg cursor-pointer transition duration-300"
        >
          登录
        </span>
        <span
            @click="isLogin = false"
            :class="!isLogin ? activeTabClass : inactiveTabClass"
            class="px-4 py-2 rounded-lg cursor-pointer transition duration-300"
        >
          注册
        </span>
      </div>

      <!-- 登录表单 -->
      <form v-if="isLogin" @submit.prevent="onLoginSubmit">
        <div class="form-group mb-4">
          <label for="loginEmail" class="block mb-1 text-gray-700">邮箱地址</label>
          <input
              type="email"
              id="loginEmail"
              v-model.trim="email"
              required
              placeholder="请输入邮箱地址"
              class="input-field"
          />
        </div>
        <div class="form-group mb-6">
          <label for="loginPassword" class="block mb-1 text-gray-700">密码</label>
          <input
              type="password"
              id="loginPassword"
              v-model.trim="password"
              required
              placeholder="请输入密码"
              class="input-field"
          />
        </div>
        <button type="submit" class="w-full btn-primary">登录</button>
      </form>

      <!-- 注册表单 -->
      <form v-else @submit.prevent="onRegisterSubmit">
        <div class="form-group mb-4">
          <label for="registerUsername" class="block mb-1 text-gray-700">用户名</label>
          <input
              type="text"
              id="registerUsername"
              v-model.trim="username"
              required
              placeholder="请输入用户名"
              class="input-field"
          />
        </div>
        <div class="form-group mb-4">
          <label for="registerEmail" class="block mb-1 text-gray-700">邮箱地址</label>
          <input
              type="email"
              id="registerEmail"
              v-model.trim="email"
              required
              placeholder="请输入邮箱地址"
              class="input-field"
          />
        </div>
        <div class="form-group mb-4">
          <label for="registerPassword" class="block mb-1 text-gray-700">密码</label>
          <input
              type="password"
              id="registerPassword"
              v-model.trim="password"
              required
              placeholder="请输入密码"
              class="input-field"
          />
        </div>
        <div class="form-group mb-6">
          <label for="confirmPassword" class="block mb-1 text-gray-700">确认密码</label>
          <input
              type="password"
              id="confirmPassword"
              v-model.trim="confirmPassword"
              required
              placeholder="请再次输入密码"
              class="input-field"
          />
        </div>
        <button type="submit" class="w-full btn-primary">注册</button>
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

<style scoped>
.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}
.input-field:focus {
  border-color: #3b82f6;
}
.btn-primary {
  padding: 10px 24px; /* 调整 padding 实现椭圆效果 */
  background-color: #3b82f6;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 9999px; /* 或者使用 Tailwind CSS 的 rounded-full */
  transition: background-color 0.1s;
}
.btn-primary:hover {
  background-color: #2563eb;
}
</style>
