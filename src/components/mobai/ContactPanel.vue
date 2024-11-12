<template>
  <div class="bg-white p-6 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg relative">
    <h2 class="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-between">
      <span>联系我</span>
      <i class="fas fa-envelope text-blue-500 animate-pulse"></i>
    </h2>
    <div class="space-y-4">
      <!-- QQ Email -->
      <div class="flex items-center space-x-3 text-gray-700">
        <i class="fas fa-envelope text-red-500 text-lg"></i>
        <span class="font-medium">QQ 邮箱:</span>
        <span class="font-semibold text-gray-800">2583086544@qq.com</span>
      </div>

      <!-- GitHub -->
      <div class="flex items-center space-x-3 text-gray-700">
        <i class="fab fa-github text-gray-800 text-lg"></i>
        <span class="font-medium">GitHub:</span>
        <a href="https://github.com/clclcllll" target="_blank" class="text-gray-700 font-semibold">
          clclcllll
        </a>
      </div>

      <!-- QQ -->
      <div class="flex items-center space-x-3 text-gray-700">
        <i class="fab fa-qq text-blue-500 text-lg"></i>
        <span class="font-medium">QQ:</span>
        <span class="font-semibold text-gray-800">2583086544</span>
      </div>
    </div>

    <!-- Canvas 用于绘制龙的运动效果 -->
    <canvas ref="dragonCanvas" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
  </div>
</template>

<script>
export default {
  name: 'ContactPanel',
  data() {
    return {
      particles: [], // 龙的粒子数组
    };
  },
  mounted() {
    this.initDragon();
    this.animate();
  },
  methods: {
    // 初始化龙的粒子
    initDragon() {
      const canvas = this.$refs.dragonCanvas;
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // 创建初始粒子（龙的身体）
      for (let i = 0; i < 50; i++) {
        this.particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: 10 - i * 0.15, // 粒子的大小
          angle: Math.random() * Math.PI * 2,
          speed: 0.5 + i * 0.03, // 速度递增
          hue: (i * 8) % 360, // 色彩渐变
        });
      }
    },
    // 动画效果
    animate() {
      const canvas = this.$refs.dragonCanvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 更新每个粒子的位置并绘制
      this.particles.forEach((particle, index) => {
        // 更新位置
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        // 使粒子沿边界反弹
        if (particle.x < 0 || particle.x > canvas.width) particle.angle = Math.PI - particle.angle;
        if (particle.y < 0 || particle.y > canvas.height) particle.angle = -particle.angle;

        // 绘制粒子
        ctx.fillStyle = `hsl(${particle.hue}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // 控制颜色和大小变化
        particle.hue += 1;
        particle.size *= 0.99;
        if (particle.size < 0.5) {
          particle.size = 10; // 重置大小，形成循环
        }
      });

      requestAnimationFrame(this.animate); // 持续更新
    },
  },
};
</script>

<style scoped>
/* 渐隐效果 */
.bg-white {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Dragon Canvas Styling */
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
