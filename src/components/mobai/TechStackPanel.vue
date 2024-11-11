<template>
  <div class="w-full md:w-5/12 lg:w-3/7 bg-white py-6 rounded-lg shadow-md transform transition-transform duration-300">
    <div class="flex items-center justify-between mb-4 px-6">
      <h2 class="text-3xl font-bold text-gray-800">技术栈</h2>
      <!-- 鼠标悬停在此图标时触发小图标显示 -->
      <i
          class="fas fa-code text-blue-500 cursor-pointer text-3xl animate-pulse hover:scale-110"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
      ></i>
    </div>
    <div class="overflow-hidden">
      <div v-if="isHovered">
        <transition name="fade">
          <!-- 鼠标悬浮时显示小图标列表 -->
          <ul class="flex flex-wrap gap-1 px-6">
            <div v-for="(tech, index) in techStack" :key="index" class="flex items-center justify-center w-auto">
              <li :class="['flex items-center gap-1 px-2 py-1 rounded-full', tech.bgColor]">
                <i :class="[tech.icon, 'text-2xl']" :style="{ color: tech.color }"></i>
                <span class="text-sm font-medium text-gray-700">{{ tech.name }}</span>
              </li>
            </div>
          </ul>
        </transition>
      </div>
      <div v-else>
        <transition name="fade">
          <!-- 滚动图标队列 -->
          <div class="scrolling-container">
            <!-- 第一行滚动图标 -->
            <div class="scroll-row scroll-row-1">
              <div v-for="(tech, index) in techStackRow1" :key="'row1-original-' + index" :class="['big-icon', tech.bgColor]">
                <i :class="[tech.icon, 'icon-large']" :style="{ color: tech.color }"></i>
              </div>
              <div v-for="(tech, index) in techStackRow1" :key="'row1-clone-' + index" :class="['big-icon', tech.bgColor]">
                <i :class="[tech.icon, 'icon-large']" :style="{ color: tech.color }"></i>
              </div>
            </div>
            <!-- 第二行滚动图标 -->
            <div class="scroll-row scroll-row-2">
              <div v-for="(tech, index) in techStackRow2" :key="'row2-original-' + index" :class="['big-icon', tech.bgColor]">
                <i :class="[tech.icon, 'icon-large']" :style="{ color: tech.color }"></i>
              </div>
              <div v-for="(tech, index) in techStackRow2" :key="'row2-clone-' + index" :class="['big-icon', tech.bgColor]">
                <i :class="[tech.icon, 'icon-large']" :style="{ color: tech.color }"></i>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { techStackData } from './content/techStackData.js';// 引入技术栈数据

export default {
  name: 'TechStackPanel',
  data() {
    return {
      isHovered: false,
      techStack: techStackData, // 原始技术栈数据
      techStackRow1: [], // 第一行的数据
      techStackRow2: []  // 第二行的数据
    };
  },
  mounted() {
    // 将 techStackData 数据分成两部分
    const midpoint = Math.ceil(techStackData.length / 2);
    this.techStackRow1 = techStackData.slice(0, midpoint); // 前半部分
    this.techStackRow2 = techStackData.slice(midpoint);    // 后半部分
  }
};
</script>

<style scoped>
.scrolling-container {
  position: relative;
  overflow: hidden;
  height: 215px; /* 容器高度，确保容纳两行150px的图标 */
}

.scroll-row {
  display: flex;
  position: absolute;
  white-space: nowrap;
  left: 0;
}

/* 第一行滚动动画 */
.scroll-row-1 {
  top: 0;
  animation: scroll-left 40s linear infinite;
}

/* 第二行滚动动画，稍微快一点 */
.scroll-row-2 {
  bottom: 0;
  animation: scroll-left-reverse 35s linear infinite;
}

/* 定义从右向左的滚动动画 */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* 50% 模拟无缝循环 */
  }
}

/* 定义从左向右的滚动动画 */
@keyframes scroll-left-reverse {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.big-icon {
  width: 120px; /* 设置图标大小 */
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px; /* 圆角矩形 */
  margin-right: 20px; /* 图标之间的间距 */
  transition: transform 0.2s ease-in-out;
}

.big-icon:hover {
  transform: scale(1.1); /* 鼠标悬浮时放大效果 */
}

.icon-large {
  font-size: 3rem; /* 图标大小 */
}

/* 过渡效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active for <2.1.8 */ {
  opacity: 0;
}
</style>
