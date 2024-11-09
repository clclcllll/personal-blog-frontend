<template>
  <div
      class="w-full lg:w-6/10 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6 flex flex-col justify-between relative shadow-lg transform transition-transform duration-300 overflow-hidden"
  >
    <!-- 内容部分 -->
    <div :class="{ 'opacity-30 filter blur-sm': showMap }">
      <p class="text-1xl opacity-90">你好，很高兴认识你</p>
      <div class="flex items-center mt-2">
        <h2 class="text-3xl font-bold">我叫 墨柏</h2>
        <!-- 点击MBY触发随机水波效果 -->
        <span
            @click="triggerWave"
            class="ml-3 bg-green-300 text-blue-800 font-semibold text-lg px-3 py-1 rounded-full shadow-md cursor-pointer transition-transform transform hover:scale-110"
        >
          MBY
        </span>
      </div>
      <p class="text-1xl mt-4 opacity-80">一名在读大学生</p>
    </div>

    <!-- 地图和地址信息 -->
    <div
        v-if="showMap"
        class="absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-300"
        :class="{ 'opacity-100': showMap, 'opacity-0': !showMap }"
    >
      <i class="fas fa-map-marked-alt text-4xl mb-2 text-yellow-400"></i>
      <p class="text-xl">北京海淀</p>
    </div>

    <div
        @mouseenter="showMap = true"
        @mouseleave="showMap = false"
        class="absolute bottom-4 right-4 cursor-pointer transition-opacity duration-300"
        :class="{ 'opacity-100': !showMap, 'opacity-0': showMap }"
    >
      <i class="fas fa-map-marked-alt text-3xl text-yellow-400 opacity-80"></i>
    </div>

    <!-- 水波效果 -->
    <div v-if="showWave" class="wave-effect" :style="waveStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfoPanel',
  data() {
    return {
      showMap: false, // 控制地图显示
      showWave: false, // 控制水波效果
      waveStyle: {}, // 动态设置水波效果的样式
    };
  },
  methods: {
    triggerWave(event) {
      // 获取卡片区域的范围
      const rect = event.currentTarget.closest('.w-full').getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      // 设置水波效果的样式
      this.waveStyle = {
        top: `${y}px`,
        left: `${x}px`,
      };

      // 触发水波效果
      this.showWave = true;

      // 动画结束后隐藏水波效果
      setTimeout(() => {
        this.showWave = false;
      }, 1000); // 持续时间与动画时间一致
    },
  },
};
</script>

<style scoped>
/* 水波效果样式 */
.wave-effect {
  position: absolute;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
  border-radius: 50%;
  transform: scale(0);
  animation: wave 1s ease-out forwards;
  pointer-events: none;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
}

/* 水波动画 */
@keyframes wave {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
