<!--src/components/articles/OutlineItem-->
<template>
  <li>
    <div
        class="flex items-center cursor-pointer py-1 pl-1"
        :class="{'font-semibold': item.level === 1}"
        @click="toggleCollapse"
    >
      <div class="w-4 flex-shrink-0 mr-1">
        <i
            v-if="item.children && item.children.length"
            :class="[
            'fas',
            item.collapsed ? 'fa-chevron-right' : 'fa-chevron-down',
            'text-gray-400 text-xs'
          ]"
        ></i>
      </div>
      <span
          @click.stop="scrollToSection"
          class="text-sm text-gray-600 hover:text-blue-500 transition-colors"
          :style="{ paddingLeft: `${(item.level - 1) * 0.01}rem` }"
      >
        {{ item.text }}
      </span>
    </div>
    <ul v-if="item.children && item.children.length && !item.collapsed" class="ml-3">
      <OutlineItem
          v-for="(child, i) in item.children"
          :key="i"
          :item="child"
      />
    </ul>
  </li>
</template>


<script>
export default {
  name: 'OutlineItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toggleCollapse() {
      if (this.item.children && this.item.children.length) {
        this.item.collapsed = !this.item.collapsed;
      }
    },
    scrollToSection() {
      const element = document.getElementById(this.item.id);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    },
  },
};
</script>