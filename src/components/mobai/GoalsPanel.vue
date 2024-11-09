<!-- components/mobai/GoalsPanel.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800">目标</h2>
      <i class="fas fa-bullseye text-red-500 animate-ping"></i>
    </div>
    <ul class="space-y-2 text-gray-700">
      <li class="flex items-center gap-2">
        <i class="fas fa-check-circle text-green-500"></i> 完成个人博客的优化
      </li>
      <li class="flex items-center gap-2">
        <i class="fas fa-check-circle text-green-500"></i> 深入学习后端开发
      </li>
      <li class="flex items-center gap-2">
        <i class="fas fa-check-circle text-green-500"></i> 探索人工智能和机器学习
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GoalsPanel',
};
</script>