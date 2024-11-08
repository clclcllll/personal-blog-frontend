<!-- src/components/common/ScrollButton.vue -->

<template>
  <div @click="scrollToContent" class="scroll-button cursor-pointer">
    <span class="mouse-icon"></span>
    <span class="arrow-icon"><i class="fas fa-chevron-down"></i></span>
  </div>
</template>

<script>
export default {
  name: 'ScrollButton',
  props: {
    scrollToContent: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
.scroll-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 10px;
  z-index: 10;
}

.mouse-icon {
  width: 24px;
  height: 36px;
  border: 2px solid white;
  border-radius: 20px;
  position: relative;
  margin-bottom: 8px;
}

.mouse-icon::before {
  content: '';
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 1.5s infinite;
}

@keyframes scroll {
  0% {
    opacity: 1;
    top: 6px;
  }
  50% {
    opacity: 0.5;
    top: 18px;
  }
  100% {
    opacity: 0;
    top: 30px;
  }
}

.arrow-icon {
  color: white;
  font-size: 1.2rem;
  opacity: 0.7;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}
</style>
