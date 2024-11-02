<!-- src/views/Register.vue -->

<template>
  <div class="register-page">
    <Navbar />
    <div class="container">
      <RegisterForm />
    </div>
    <Footer />
  </div>
</template>

<script>

import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
import RegisterForm from '@/components/users/RegisterForm.vue';

export default {
  name: 'RegisterPage',
  components: {
    Footer,
    RegisterForm,
    Navbar,
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
}
</style>
