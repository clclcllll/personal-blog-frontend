<!-- src/components/common/Footer.vue -->

<template>
  <footer class="bg-gray-100 border-t border-gray-200 py-6">
    <div class="container mx-auto text-center">
      <p class="text-gray-600 mb-4">© 2023 My Blog. All rights reserved.</p>
      <ul class="flex justify-center space-x-6">
        <li>
          <a
              href="https://github.com/yourusername"
              target="_blank"
              class="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
              href="mailto:youremail@example.com"
              class="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            联系我们
          </a>
        </li>
        <li>
          <router-link
              to="/privacy"
              class="text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            隐私政策
          </router-link>
        </li>
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
/* 已经通过 Tailwind 优化样式，无需额外 CSS */
</style>
