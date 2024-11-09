<!-- components/mobai/VisitorStatsPanel.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-800">访客统计</h2>
      <i class="fas fa-chart-line text-blue-500 animate-pulse"></i>
    </div>
    <ul class="space-y-2 text-gray-700">
      <li>今日访问：<span class="font-semibold">66</span></li>
      <li>本月访问：<span class="font-semibold">346</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VisitorStatsPanel',
};
</script>