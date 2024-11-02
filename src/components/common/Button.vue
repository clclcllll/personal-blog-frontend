<!-- src/components/common/Button.vue -->

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
      return ['btn', `btn-${this.type}`];
    },
  },
  emits: ['click'],
};
</script>

<style scoped>
.btn {
  padding: 5px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.btn-default {
  background-color: #e0e0e0;
  color: #333;
}
.btn-primary {
  background-color: #42b983;
  color: #fff;
}
.btn-danger {
  background-color: #ff4d4f;
  color: #fff;
}
</style>
