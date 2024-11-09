<!-- src/components/mobai/AboutSitePanel.vue -->
<template>
  <div class="w-full lg:w-4/10 bg-white text-gray-800 rounded-lg p-6 relative shadow-md transform transition-transform duration-300">
    <div class="absolute top-2 right-2 bg-blue-100 rounded-full px-3 py-1 flex items-center shadow-md transition-transform duration-300 transform hover:rotate-12">
      <i class="fas fa-info-circle text-blue-500 text-2xl"></i>
    </div>
    <h2 class="text-3xl font-bold mb-4">关于本站</h2>
    <p class="text-1xl">
      一款 <span class="text-red-500 font-semibold">前Vue3</span> + <span class="text-blue-500 font-semibold">后Node.js</span> + <span class="text-green-500 font-semibold">数据库MongoDB</span> 的个人博客系统
    </p>

    <!-- 循环诗句的容器 -->
    <div class="mt-6 overflow-hidden h-8 relative">
      <div class="scrolling-text">
        <!-- 原始诗句列表 -->
        <p v-for="(line, index) in poemLines" :key="index" class="text-lg font-semibold text-gray-600">
          {{ line }}
        </p>
        <!-- 复制一份诗句列表 -->
        <p v-for="(line, index) in poemLines" :key="'copy-' + index" class="text-lg font-semibold text-gray-600">
          {{ line }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutSitePanel',
  data() {
    return {
      poemLines: [
        "墨洒千江书不尽，松柏长青傲风霜。",
        "风送幽香墨染山，波携清韵水流长。"
      ],
    };
  },
};
</script>

<style scoped>
.scrolling-text {
  display: flex;
  flex-direction: column;
  animation: scroll 5s linear infinite; /* 控制滚动的持续时间 */
}

@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%); /* 移动距离为原始内容的一半，循环无缝衔接 */
  }
}
</style>