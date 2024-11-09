<!-- components/mobai/PhotoPanel.vue -->
<template>
  <div class="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105 flex justify-center items-center">
    <div class="relative">
      <img src="../../assets/images/1.jpeg" alt="Personal Photo" class="rounded-full w-32 h-32 object-cover">
      <div class="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full shadow-md">
        <i class="fas fa-camera text-white animate-pulse"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoPanel',
};
</script>