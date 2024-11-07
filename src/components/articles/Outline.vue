<!--src/components/articles/Outline-->
<template>
  <div
      ref="outlineContainer"
      class="fixed left-0 top-20 h-[calc(100vh-5rem)] overflow-y-auto bg-white shadow-lg rounded-lg"
      :style="{ width: `${width}px` }"
  >
    <div
        class="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-300 hover:bg-gray-400"
        @mousedown="startResize"
    ></div>
    <h2 class="text-lg font-semibold text-gray-800 px-2 py-3 border-b">大纲</h2>
    <ul class="py-2">
      <template v-for="(item, index) in outline" :key="index">
        <OutlineItem :item="item" />
      </template>
    </ul>
  </div>
</template>

<script>
import {ref, onMounted, watchEffect, onUnmounted} from 'vue';
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
    const md = new MarkdownIt();
    const slugify = (s) => s.trim().toLowerCase().replace(/\s+/g, '-');

    const width = ref(256); // 初始宽度
    const outlineContainer = ref(null);
    let isResizing = false;


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

    const startResize = (e) => {
      isResizing = true;
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    };
    const resize = (e) => {
      if (isResizing) {
        const newWidth = e.clientX;
        width.value = Math.max(200, Math.min(newWidth, 600)); // 限制最小宽度为 200px，最大宽度为 600px
      }
    };

    const stopResize = () => {
      isResizing = false;
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    };

    onMounted(() => {
      generateOutline();
    });

    watchEffect(() => {
      generateOutline();
    });

    onUnmounted(() => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    });


    return  { outline, width, outlineContainer, startResize };
  },
};
</script>
