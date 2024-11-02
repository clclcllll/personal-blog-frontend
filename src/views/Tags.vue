<!-- src/views/Tags.vue -->

<template>
  <Navbar />
  <div class="tags-page">
    <h1>标签列表</h1>
    <ul>
      <li v-for="tag in tags" :key="tag._id">
        <router-link :to="{ name: 'Tag', params: { id: tag._id } }">
          {{ tag.name }}
        </router-link>
      </li>
    </ul>
  </div>
  <Footer />
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  name: 'Tags',
  components: {Navbar, Footer},
  setup() {
    const store = useStore();
    const tags = ref([]);

    const loadTags = async () => {
      await store.dispatch('tag/fetchTags');
      tags.value = store.state.tag.tags;
    };

    onMounted(() => {
      loadTags();
    });

    return {
      tags,
    };
  },
};
</script>

<style scoped>
.tags-page {
  max-width: 800px;
  margin: 20px auto;
}
.tags-page h1 {
  margin-bottom: 20px;
}
.tags-page ul {
  list-style: none;
  padding: 0;
}
.tags-page li {
  margin-bottom: 10px;
}
</style>
