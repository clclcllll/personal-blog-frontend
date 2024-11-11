<!-- src/components/Hobbies/BackgroundImage.vue -->
<template>
  <div
      class="absolute inset-0 rounded-lg"
      :style="{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-image 0.5s ease',
      backdropFilter: isBlurred ? 'blur(10px)' : 'none'
    }"
  ></div>
</template>

<script>
export default {
  props: {
    backgroundImage: { type: String, required: true },
    isBlurred: { type: Boolean, default: false }
  }
};
</script>
