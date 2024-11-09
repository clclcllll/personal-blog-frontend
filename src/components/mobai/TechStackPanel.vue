<!-- components/mobai/TechStackPanel.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800">技术栈</h2>
      <i class="fas fa-cogs text-green-500 animate-spin-slow"></i>
    </div>
    <ul class="flex flex-wrap gap-4 text-gray-700">
      <li class="flex items-center gap-2">
        <i class="fab fa-vuejs text-green-500 animate-bounce"></i> Vue.js
      </li>
      <li class="flex items-center gap-2">
        <i class="fab fa-node-js text-green-600 animate-bounce"></i> Node.js
      </li>
      <li class="flex items-center gap-2">
        <i class="fab fa-python text-blue-500 animate-bounce"></i> Python
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TechStackPanel',
};
</script>