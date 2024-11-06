<!-- src/components/common/Pagination.vue -->

<template>
  <div class="pagination flex items-center justify-center space-x-4">
    <!-- 上一页按钮 -->
    <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="p-2 rounded-full bg-gray-100 hover:bg-blue-100 disabled:opacity-50 transition duration-300 ease-in-out"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- 页码显示 -->
    <span class="text-gray-600 font-medium">
      {{ currentPage }} / {{ totalPages }}
    </span>

    <!-- 下一页按钮 -->
    <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="p-2 rounded-full bg-gray-100 hover:bg-blue-100 disabled:opacity-50 transition duration-300 ease-in-out"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ['page-changed'],
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  margin: 20px 0;
}
</style>
