<!-- src/components/common/Footer.vue -->

<template>
  <footer class="footer">
    <div class="container">
      <p>© 2023 My Blog. All rights reserved.</p>
      <ul class="footer-links">
        <li><a href="https://github.com/yourusername" target="_blank">GitHub</a></li>
        <li><a href="mailto:youremail@example.com">联系我们</a></li>
        <li><router-link to="/privacy">隐私政策</router-link></li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #f5f5f5;
  padding: 20px 0;
  margin-top: 40px;
}
.container {
  text-align: center;
}
.footer-links {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
}
.footer-links li {
  display: inline-block;
  margin: 0 10px;
}
.footer-links a {
  color: #666;
  text-decoration: none;
}
</style>
