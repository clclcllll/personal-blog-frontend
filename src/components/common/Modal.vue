<!-- src/components/common/Modal.vue -->

<template>
  <div class="modal-mask" v-if="visible">
    <div class="modal-wrapper" @click.self="close">
      <div class="modal-container">
        <!-- 标题 -->
        <div class="modal-header">
          <slot name="header">
            <h3>提示</h3>
          </slot>
        </div>

        <!-- 内容 -->
        <div class="modal-body">
          <slot>
            内容
          </slot>
        </div>

        <!-- 底部 -->
        <div class="modal-footer">
          <slot name="footer">
            <button @click="close">关闭</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-wrapper {
  position: relative;
}
.modal-container {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  max-width: 80%;
}
.modal-header h3 {
  margin: 0;
}
.modal-body {
  margin: 20px 0;
}
.modal-footer {
  text-align: right;
}
.modal-footer button {
  padding: 5px 10px;
}
</style>
