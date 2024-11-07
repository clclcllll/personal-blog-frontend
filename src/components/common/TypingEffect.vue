<template>
  <p class="text-lg mb-6 text-center">
    <span>{{ displayText }}</span><span class="blinking-cursor">|</span>
  </p>
</template>

<script>
export default {
  name: "TypingEffect",
  data() {
    return {
      messages: [
        "墨洒千江书不尽，松柏长青傲风霜。",
      ],
      displayText: "",
      currentMessageIndex: 0,
      typingSpeed: 100, // 打字速度，越小越快
      deletingSpeed: 50, // 删除速度，越小越快
      delayBetweenMessages: 2000, // 切换句子的间隔时间
      isDeleting: false,
    };
  },
  methods: {
    typeEffect() {
      const currentMessage = this.messages[this.currentMessageIndex];

      if (!this.isDeleting && this.displayText.length < currentMessage.length) {
        // 正在打字
        this.displayText = currentMessage.substring(0, this.displayText.length + 1);
      } else if (this.isDeleting && this.displayText.length > 0) {
        // 正在删除
        this.displayText = currentMessage.substring(0, this.displayText.length - 1);
      }

      // 切换到删除模式或下一句
      if (this.displayText === currentMessage && !this.isDeleting) {
        setTimeout(() => (this.isDeleting = true), this.delayBetweenMessages);
      } else if (this.displayText === "" && this.isDeleting) {
        this.isDeleting = false;
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.messages.length;
      }

      setTimeout(this.typeEffect, this.isDeleting ? this.deletingSpeed : this.typingSpeed);
    },
  },
  mounted() {
    this.typeEffect();
  },
};
</script>

<style scoped>
.blinking-cursor {
  opacity: 1;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
