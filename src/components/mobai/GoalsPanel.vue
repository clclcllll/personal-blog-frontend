<template>
  <div class="bg-white p-6 rounded-lg shadow-md overflow-hidden relative">
    <!-- 内容部分 -->
    <div :class="{ 'opacity-30 filter blur-sm': showOverlay }">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold text-gray-800">目标</h2>
      </div>
      <ul class="space-y-4 text-gray-700 overflow-y-auto max-h-[300px]">
        <li v-for="(goal, index) in goals" :key="index"
            class="flex items-start gap-3 p-3 rounded-lg transition-all duration-300">
          <div class="flex items-center gap-2">
            <span class="text-2xl">
              <i :class="goal.icon"></i>
            </span>
            <span class="text-sm">{{ goal.text }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 悬浮显示的欢迎信息 -->
    <div
        v-if="showOverlay"
        class="absolute inset-0 flex flex-col items-center justify-center text-gray-800 transition-opacity duration-300"
        :class="{ 'opacity-100': showOverlay, 'opacity-0': !showOverlay }"
    >
      <i class="fas fa-bullseye text-red-500 text-4xl animate-pulse"></i>
      <p class="text-xl font-semibold">Fighting</p>
    </div>

    <!-- 悬浮图标 -->
    <div
        @mouseenter="showOverlay = true"
        @mouseleave="showOverlay = false"
        class="absolute top-6 right-2 rounded-full px-3 py-1 flex items-center transition-transform duration-300 transform cursor-pointer"
        :class="{ 'opacity-0': showOverlay }"
    >
      <i class="fas fa-bullseye text-red-500 text-3xl animate-pulse"></i>
    </div>
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

    const showOverlay = ref(false)

    return {
      goals,
      showOverlay
    }
  }
}
</script>

<style scoped>
/* 可选的额外样式 */
</style>