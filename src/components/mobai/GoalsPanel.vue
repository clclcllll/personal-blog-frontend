<template>
  <div class="bg-white p-6 rounded-lg shadow-md overflow-hidden">
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold text-gray-800">目标</h2>
      <i class="fas fa-bullseye text-red-500 text-3xl animate-pulse"></i>
    </div>
    <ul class="space-y-4 text-gray-700 overflow-y-auto max-h-[300px]">
      <li v-for="(goal, index) in goals" :key="index"
          class="flex items-start gap-3 p-3 rounded-lg transition-all duration-300">
        <div class="flex items-center gap-2">
          <!-- 使用 Font Awesome 图标 -->
          <span class="text-2xl">
            <i :class="goal.icon"></i>
          </span>
          <span class="text-sm">{{ goal.text }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GoalsPanel',
  setup() {
    const goals = ref([
      {
        text: "深入掌握全栈技术，持续优化个人博客",
        icon: "fas fa-laptop-code", // Font Awesome 图标类
      },
      {
        text: "系统学习Spring全家桶、分布式微服务架构，探索深度学习和机器学习",
        icon: "fas fa-cogs", // Font Awesome 图标类
      },
      {
        text: "拿下一份大厂实习",
        icon: "fas fa-briefcase", // Font Awesome 图标类
      },
      {
        text: "阅读《了不起的盖茨比》英文原版",
        icon: "fas fa-book", // Font Awesome 图标类
      }
    ])

    return {
      goals
    }
  }
}
</script>
