<template>
  <div class="w-full lg:w-4/10 bg-white text-gray-800 rounded-lg p-6 relative shadow-md transform transition-transform duration-300 overflow-hidden">
    <!-- 内容部分 -->
    <div :class="{ 'opacity-30 filter blur-sm': showOverlay }">
      <h2 class="text-3xl font-bold mb-4">关于本站</h2>
      <p class="text-1xl">
        一款 <span class="text-red-500 font-semibold">前Vue3</span> + <span class="text-blue-500 font-semibold">后Node.js</span> + <span class="text-green-500 font-semibold">数据库MongoDB</span> 的个人博客系统
      </p>

      <!-- 打字效果的诗句显示区 -->
      <div class="mt-6">
        <TypingEffect :lines="lines" />
      </div>
    </div>

    <!-- 悬浮显示的欢迎信息 -->
    <div
        v-if="showOverlay"
        class="absolute inset-0 flex flex-col items-center justify-center text-gray-800 transition-opacity duration-300"
        :class="{ 'opacity-100': showOverlay, 'opacity-0': !showOverlay }"
    >
      <i class="fas fa-smile text-4xl mb-2 text-blue-400"></i>
      <p class="text-xl font-semibold">欢迎访问</p>
    </div>

    <!-- 悬浮图标 -->
    <div
        @mouseenter="showOverlay = true"
        @mouseleave="showOverlay = false"
        class="absolute top-2 right-2 rounded-full px-3 py-1 flex items-center transition-transform duration-300 transform cursor-pointer"
        :class="{ 'opacity-0': showOverlay }"
    >
      <i class="fas fa-info-circle text-blue-500 text-3xl animate-pulse"></i>
    </div>
  </div>
</template>

<script>
import TypingEffect from "@/components/common/TypingEffect.vue";

export default {
  name: 'AboutSitePanel',
  components: { TypingEffect },
  data() {
    return {
      lines: [
        "墨洒千江书不尽，松柏长青傲风霜。",
        "风送幽香墨染山，波携清韵水流长。"
      ],
      showOverlay: false, // 控制悬浮信息显示
    };
  },
};
</script>

<style scoped>
/* Optional additional styling */
</style>
