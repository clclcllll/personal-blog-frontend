<template>
  <button :class="buttonClass" @click="$emit('click')">
    <slot>按钮</slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    buttonClass() {
      const baseClasses = 'px-4 py-2 rounded cursor-pointer font-semibold transition-colors duration-200';
      const typeClasses = {
        default: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
        primary: 'bg-primary text-white hover:bg-blue-700',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      };

      return `${baseClasses} ${typeClasses[this.type] || typeClasses.default}`;
    },
  },
  emits: ['click'],
};
</script>

<style scoped>
/* 如果有额外的自定义样式需求，可以在此处进行补充 */
</style>
