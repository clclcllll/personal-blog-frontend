<template>
  <li>
    <div
        class="flex items-center cursor-pointer py-1 pl-1"
        :class="{'font-semibold text-blue-500': activeId === item.id}"
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
          :style="{ paddingLeft: `${(item.level - 1) * 0.5}rem` }"
      >
        {{ item.text }}
      </span>
    </div>
    <ul v-if="item.children && item.children.length && shouldExpand" class="ml-3">
      <OutlineItem
          v-for="(child, i) in item.children"
          :key="i"
          :item="child"
          :activeId="activeId"
          :expandChain="expandChain"
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
    activeId: {
      type: String,
      default: null,
    },
    expandChain: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    shouldExpand() {
      // 如果在 expandChain 中则自动展开
      return this.expandChain.includes(this.item.id) || !this.item.collapsed;
    }
  },
  methods: {
    toggleCollapse() {
      // 手动折叠时不影响 expandChain
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
