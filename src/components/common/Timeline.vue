<template>
  <div class="timeline flex space-x-4 overflow-x-auto py-4 rounded-lg px-4">
    <button
        v-for="year in years"
        :key="year"
        @click="handleClick(year)"
        class="px-4 py-2 flex items-center gap-2 rounded-full text-gray-600 font-medium hover:bg-blue-500 hover:text-white transition-colors duration-300"
        :class="{ 'bg-blue-500 text-white': year === activeYear }"
    >
      <i class="fas fa-calendar-alt" v-if="year !== activeYear"></i>
      <i class="fas fa-check-circle" v-else></i>
      <span>{{ year }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    years: {
      type: Array,
      required: true,
    },
    selectedYear: {
      type: Number,
      default: null,
    },
  },
  emits: ['year-selected'],
  data() {
    return {
      activeYear: null, // 用于高亮显示
    };
  },
  methods: {
    handleClick(year) {
      this.activeYear = year;
      this.$emit('year-selected', year);

      // 在短暂高亮显示后重置 activeYear
      setTimeout(() => {
        this.activeYear = null;
      }, 500); // 0.5秒后恢复
    },
  },
  watch: {
    selectedYear(newYear) {
      this.activeYear = newYear; // 同步选中的年份
    },
  },
};
</script>
