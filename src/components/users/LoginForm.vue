<!-- src/components/users/LoginForm.vue -->

<template>
  <div class="login-form bg-white shadow-md rounded-lg p-8 mx-auto">
    <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">用户登录</h2>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div class="form-group">
        <label for="email" class="block text-gray-600 font-medium mb-2">邮箱地址</label>
        <input
            type="email"
            id="email"
            v-model.trim="email"
            required
            placeholder="请输入邮箱地址"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        />
      </div>
      <div class="form-group">
        <label for="password" class="block text-gray-600 font-medium mb-2">密码</label>
        <input
            type="password"
            id="password"
            v-model.trim="password"
            required
            placeholder="请输入密码"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        />
      </div>
      <button
          type="submit"
          class="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        登录
      </button>
    </form>
    <p class="text-center mt-6 text-gray-600">
      还没有账户？<router-link to="/register" class="text-blue-500 hover:underline">立即注册</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions, useStore } from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');

    const { login } = mapActions('user', ['login']);
    const store = useStore();
    const router = useRouter();

    const onSubmit = async () => {
      try {
        await store.dispatch('user/login', { email: email.value, password: password.value });
        await router.push({ name: 'Home' });
      } catch (error) {
        console.error('Login error:', error);
        alert(error.response?.data?.error || '登录失败，请重试');
      }
    };

    return {
      email,
      password,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin-top: 80px;
}
</style>
