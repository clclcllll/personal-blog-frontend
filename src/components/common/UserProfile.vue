<!-- src/components/UserProfile.vue -->
<template>
  <div class="relative w-full max-w-3xl px-4 flex items-center justify-center">
    <!-- Left Tags -->
    <div class="flex flex-col gap-2 mr-8">
      <span class="tag-float-left tag-1 px-3 py-1.5 bg-blue-500/10 text-blue-700 rounded-full text-xs inline-flex items-center backdrop-blur-sm shadow-sm hover:bg-blue-500/15 transition-all">
        <i class="fas fa-user-astronaut mr-1.5 text-blue-500"></i>i人
      </span>
      <span class="tag-float-left tag-2 px-3 py-1.5 bg-green-500/10 text-green-700 rounded-full text-xs inline-flex items-center backdrop-blur-sm shadow-sm hover:bg-green-500/15 transition-all">
        <i class="fas fa-hiking mr-1.5 text-green-500"></i>行动派
      </span>
      <span class="tag-float-left tag-3 px-3 py-1.5 bg-yellow-500/10 text-yellow-700 rounded-full text-xs inline-flex items-center backdrop-blur-sm shadow-sm hover:bg-yellow-500/15 transition-all">
        <i class="fas fa-code mr-1.5 text-yellow-500"></i>全栈CV工程师
      </span>
    </div>

    <!-- Profile Image with Status -->
    <div class="relative">
      <div class="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
        <img src="../../../src/assets/images/1.jpeg" alt="Profile" class="w-full h-full object-cover" />
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
      </div>
    </div>

    <!-- Right Tags -->
    <div class="flex flex-col gap-2 ml-8">
      <span class="tag-float-right tag-1 px-3 py-1.5 bg-purple-500/10 text-purple-700 rounded-full text-xs inline-flex items-center backdrop-blur-sm shadow-sm hover:bg-purple-500/15 transition-all">
        <i class="fas fa-leaf mr-1.5 text-purple-500"></i>优雅强迫症
      </span>
      <span class="tag-float-right tag-2 px-3 py-1.5 bg-red-500/10 text-red-700 rounded-full text-xs inline-flex items-center backdrop-blur-sm shadow-sm hover:bg-red-500/15 transition-all">
        <i class="fas fa-map-marker-alt mr-1.5 text-red-500"></i>旅游
      </span>
      <span class="tag-float-right tag-3 px-3 py-1.5 bg-pink-500/10 text-pink-700 rounded-full text-xs inline-flex items-center backdrop-blur-sm shadow-sm hover:bg-pink-500/15 transition-all">
        <i class="fas fa-star mr-1.5 text-pink-500"></i>狮子座
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileSection',
};
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.tag-float-left:nth-child(1), .tag-float-right:nth-child(1) {
  animation: float 3s ease-in-out infinite;
  animation-delay: 0s;
}
.tag-float-left:nth-child(2), .tag-float-right:nth-child(2) {
  animation: float 3.5s ease-in-out infinite;
  animation-delay: 0.5s;
}
.tag-float-left:nth-child(3), .tag-float-right:nth-child(3) {
  animation: float 4s ease-in-out infinite;
  animation-delay: 1s;
}
.tag-float-left:hover, .tag-float-right:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  opacity: 0.9;
}
</style>
