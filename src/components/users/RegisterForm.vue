<!-- src/components/users/RegisterForm.vue -->

<template>
  <div class="register-form">
    <h2>用户注册</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input
            type="text"
            id="username"
            v-model.trim="username"
            required
            placeholder="请输入用户名"
        />
      </div>
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
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input
            type="password"
            id="confirmPassword"
            v-model.trim="confirmPassword"
            required
            placeholder="请再次输入密码"
        />
      </div>
      <button type="submit" class="btn btn-primary">注册</button>
    </form>
    <p class="login-link">
      已有账户？<router-link to="/login">立即登录</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { register } from '@/api/user';
import {useRouter} from "vue-router";

export default {
  name: 'RegisterForm',
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const router = useRouter();

    const onSubmit = async () => {
      if (password.value !== confirmPassword.value) {
        alert('两次输入的密码不一致');
        return;
      }
      try {
        await register({
          username: username.value,
          email: email.value,
          password: password.value,
        });
        alert('注册成功，请登录');
        // 注册成功，跳转到登录页
        await router.push({name: 'Login'});
      } catch (error) {
        // 处理注册失败的情况，显示错误消息
        alert(error.response.data.error || '注册失败，请重试');
      }
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.register-form {
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
.login-link {
  text-align: center;
  margin-top: 20px;
}
</style>
