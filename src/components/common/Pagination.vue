<!-- src/components/common/Pagination.vue -->

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      上一页
    </button>
    <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
    <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
      下一页
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.pagination button {
  padding: 5px 10px;
  margin: 0 10px;
}
.pagination span {
  margin: 0 10px;
}
</style>
