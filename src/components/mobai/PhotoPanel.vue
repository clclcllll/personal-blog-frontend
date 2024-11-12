<template>
  <div class="w-full md:w-6/12 lg:w-2/3 bg-white rounded-lg shadow-md transform transition-transform duration-300 h-full overflow-hidden relative">
    <div class="relative w-full h-full">
      <div class="py-6 absolute top-0 left-5 bg-opacity-60 text-white text-center text-3xl font-semibold py-2 z-10">
        我的照片
      </div>

      <transition-group name="fade" tag="div" class="relative w-full h-full">
        <img
            v-for="(photo, index) in photos"
            :key="photo"
            :src="index === currentPhotoIndex || imageCache.has(photo) ? photo : lowResPlaceholder"
            :alt="`Personal Photo ${index + 1}`"
            class="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 rounded-lg"
            :class="{ 'opacity-100': index === currentPhotoIndex, 'opacity-0': index !== currentPhotoIndex }"
            @load="imageLoaded(photo)"
        />
      </transition-group>
    </div>
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      <button
          v-for="(photo, index) in photos"
          :key="index"
          @click="setCurrentPhoto(index)"
          class="w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          :class="index === currentPhotoIndex ? 'bg-blue-500' : 'bg-gray-300'"
      ></button>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import {photos} from './content/photosData.js'

const lowResPlaceholder = 'path/to/low-res-placeholder.jpg'
const currentPhotoIndex = ref(0)
const imageCache = new Map()

const setCurrentPhoto = (index) => {
  currentPhotoIndex.value = index
}

// 预加载图像，并缓存加载过的图片
const preloadImages = () => {
  photos.forEach(photo => {
    if (!imageCache.has(photo)) {
      const img = new Image()
      img.src = photo
      img.onload = () => {
        imageCache.set(photo, true) // 将图像标记为已加载
      }
    }
  })
}

// 每次图片加载完成时，确保已缓存
const imageLoaded = (photo) => {
  imageCache.set(photo, true)
}

// 自动切换图片
const autoAdvance = () => {
  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.length
}

let intervalId = null

onMounted(() => {
  preloadImages()
  intervalId = setInterval(autoAdvance, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
