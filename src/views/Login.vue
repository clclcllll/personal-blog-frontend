<!-- src/views/Login.vue -->

<template>
  <div class="login-page">
    <Navbar />
    <div class="container">
      <LoginForm />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import LoginForm from '@/components/users/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    Navbar,
    Footer,
    LoginForm,
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
}
</style>
