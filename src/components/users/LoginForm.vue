<!-- src/components/users/LoginForm.vue -->

<template>
  <div class="login-form">
    <h2>用户登录</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">邮箱地址</label>
        <input
            type="email"
            id="email"
            v-model.trim="email"
            required
            placeholder="请输入邮箱地址"
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input
            type="password"
            id="password"
            v-model.trim="password"
            required
            placeholder="请输入密码"
        />
      </div>
      <button type="submit" class="btn btn-primary">登录</button>
    </form>
    <p class="register-link">
      还没有账户？<router-link to="/register">立即注册</router-link>
    </p>
  </div>
</template>

<script>
import {mapActions, useStore} from 'vuex';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');

    const { login } = mapActions('user', ['login']);
    const store = useStore();
    const router = useRouter(); // 获取 router 实例


    const onSubmit = async () => {
      try {
        await store.dispatch('user/login', { email: email.value, password: password.value });
        // 登录成功，跳转到首页
        await router.push({name: 'Home'}); // 使用 router.push 进行导航
      } catch (error) {
        // 处理登录失败的情况，显示错误消息
        console.error("Login error:", error);
        // 处理登录失败的情况，显示错误消息
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
  margin: 50px auto;
}
h2 {
  text-align: center;
  margin-bottom: 30px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}
.register-link {
  text-align: center;
  margin-top: 20px;
}
</style>
