<!-- src/components/Hobbies/TabIcon.vue -->
<template>
  <div class="relative group">
    <i :class="[iconClass, 'text-3xl cursor-pointer transition-transform duration-200']"
       :style="{ color }"
       @click="handleClick"
       :class="{ 'opacity-50': inactive }"></i>
    <span class="tooltip-text opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs text-white font-semibold whitespace-nowrap">
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TabIcon',
  props: {
    iconClass: { type: String, required: true },
    color: { type: String, required: true },
    label: { type: String, required: true },
    inactive: { type: Boolean, default: false },
  },
  methods: {
    handleClick() {
      this.$emit('click'); // 使用 $emit 发出 'click' 事件
    }
  }
};
</script>
