<!-- components/mobai/ContactPanel.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-lg hover:scale-105">
    <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-between">
      <span>联系我</span>
      <i class="fas fa-envelope text-blue-500 animate-pulse"></i>
    </h2>
    <div class="flex flex-wrap gap-4 text-gray-700">
      <!-- Email -->
      <div class="flex items-center space-x-2">
        <i class="fas fa-envelope text-red-500"></i>
        <span>Email:</span>
        <span class="font-semibold text-gray-800">example@example.com</span>
      </div>

      <!-- GitHub -->
      <div class="flex items-center space-x-2">
        <i class="fab fa-github text-gray-800"></i>
        <span>GitHub:</span>
        <a href="https://github.com/yourusername" target="_blank" class="text-blue-500 font-semibold hover:underline">
          yourusername
        </a>
      </div>

      <!-- LinkedIn -->
      <div class="flex items-center space-x-2">
        <i class="fab fa-linkedin text-blue-700"></i>
        <span>LinkedIn:</span>
        <a href="https://linkedin.com/in/yourusername" target="_blank" class="text-blue-500 font-semibold hover:underline">
          yourusername
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPanel',
};
</script>
