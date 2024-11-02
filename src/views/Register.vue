<!-- src/views/Register.vue -->

<template>
  <div class="register-page">

    <div class="container">
      <RegisterForm />
    </div>
    <Footer />
  </div>
</template>

<script>

import Footer from '@/components/common/Footer.vue';
import RegisterForm from '@/components/users/RegisterForm.vue';

export default {
  name: 'RegisterPage',
  components: {
    Footer,
    RegisterForm,
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 50px auto;
}
</style>
