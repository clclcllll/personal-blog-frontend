<!-- src/components/Hobbies/ImageIndicator.vue -->
<template>
  <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
    <button
        v-for="(image, index) in images"
        :key="index"
        @click="setCurrentPhoto(index)"
        class="w-3 h-3 rounded-full"
        :class="index === currentIndex ? 'bg-white' : 'bg-gray-300'"
    ></button>
  </div>
</template>

<script>
export default {
  props: {
    images: { type: Array, required: true },
    currentIndex: { type: Number, required: true },
    onPhotoClick: { type: Function, required: true }
  },
  methods: {
    setCurrentPhoto(index) {
      this.onPhotoClick(index);
    }
  }
};
</script>
