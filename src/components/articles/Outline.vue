<!--src/components/articles/Outline.vue-->
<template>
  <div
      ref="outlineContainer"
      class="max-h-[calc(100vh-8rem)] w-60 overflow-y-auto border bg-white rounded-lg"
  >
    <h2 class="text-lg font-semibold text-gray-800 px-4 py-3 border-b sticky top-0 bg-white z-10">大纲视图</h2>
    <ul class="py-2 px-4">
      <template v-for="(item, index) in outline" :key="index">
        <OutlineItem :item="item" :activeId="activeId" :expandChain="expandChain" />
      </template>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue';
import MarkdownIt from 'markdown-it';
import OutlineItem from './OutlineItem.vue';

export default {
  components: {
    OutlineItem,
  },
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const outline = ref([]);
    const activeId = ref(null); // 当前滚动到的标题ID
    const expandChain = ref([]); // 要展开的父项链条及子项
    const md = new MarkdownIt();
    const slugify = (s) => s.trim().toLowerCase().replace(/\s+/g, '-');

    const generateOutline = () => {
      if (typeof props.content !== 'string' || !props.content.trim()) {
        outline.value = [];
        return;
      }

      const tokens = md.parse(props.content, {});
      const tempOutline = [];
      const stack = [];

      tokens.forEach((token) => {
        if (token.type === 'heading_open') {
          const level = parseInt(token.tag.replace('h', ''));
          const text = tokens[tokens.indexOf(token) + 1].content;
          const id = slugify(text);

          const item = { level, text, id, collapsed: true, children: [] };

          while (stack.length && stack[stack.length - 1].level >= level) {
            stack.pop();
          }

          if (stack.length === 0) {
            tempOutline.push(item);
          } else {
            const parent = stack[stack.length - 1];
            parent.children.push(item);
          }

          stack.push(item);
        }
      });

      outline.value = tempOutline;
    };

    const handleScroll = () => {
      const headings = outline.value.flatMap(getHeadings); // 获取所有标题的 DOM 元素
      let closestHeading = null;
      let closestDistance = Infinity;

      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          const distance = Math.abs(element.getBoundingClientRect().top);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestHeading = heading;
          }
        }
      });

      if (closestHeading) {
        activeId.value = closestHeading.id;
        expandChain.value = getParentChain(closestHeading.id);
      }
    };

    const getHeadings = (item) => [item, ...(item.children || []).flatMap(getHeadings)];

    const getParentChain = (id) => {
      const chain = [];
      const findChain = (items, targetId) => {
        for (const item of items) {
          if (item.id === targetId) {
            chain.push(item.id);
            if (item.children) {
              // 将子项也添加到链条中
              item.children.forEach((child) => chain.push(child.id));
            }
            return true;
          }
          if (item.children && findChain(item.children, targetId)) {
            chain.push(item.id);
            return true;
          }
        }
        return false;
      };
      findChain(outline.value, id);
      return chain;
    };

    onMounted(() => {
      generateOutline();
      document.addEventListener('scroll', handleScroll, { passive: true });
    });

    watchEffect(() => {
      generateOutline();
    });

    return { outline, activeId, expandChain };
  },
};
</script>