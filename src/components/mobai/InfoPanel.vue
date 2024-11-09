<!-- src/components/InfoPanel.vue -->
<template>
  <div :class="`bg-${backgroundColor} text-${textColor} rounded-lg p-8`">
    <h2 class="text-xl font-bold mb-4 flex items-center">
      <i :class="`fas ${iconClass} text-${iconColor} mr-2`"></i>
      {{ title }}
    </h2>

    <div v-if="stats" class="grid grid-cols-2 gap-4">
      <div class="text-center" v-for="(stat, index) in stats" :key="index">
        <div class="text-3xl font-bold">{{ stat.value }}</div>
        <div class="text-sm">{{ stat.label }}</div>
      </div>
    </div>

    <div v-else-if="content" class="text-gray-600">{{ content }}</div>

    <div v-else-if="techStack" class="grid grid-cols-3 gap-4">
      <div v-for="(tech, index) in techStack" :key="index" class="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
        <i :class="tech.icon" class="text-2xl"></i>
        <span class="text-xs mt-1">{{ tech.label }}</span>
      </div>
    </div>

    <div v-else-if="personality" class="flex items-center gap-3">
      <span class="text-2xl font-bold text-blue-600">{{ personality.type }}</span>
      <span class="text-gray-600">{{ personality.description }}</span>
    </div>
    <div v-else-if="timeline" class="relative">
      <div class="h-2 bg-blue-100 rounded">
        <div :style="{ width: timeline.progress }" class="h-full bg-blue-500 rounded"></div>
      </div>
      <div class="flex justify-between mt-2">
        <span class="text-sm text-gray-500">{{ timeline.start }}</span>
        <span class="text-sm text-gray-500">{{ timeline.end }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPanel",
  props: {
    title: { type: String, required: true },
    iconClass: { type: String, required: true },
    backgroundColor: { type: String, default: "white" },
    textColor: { type: String, default: "gray-800" },
    iconColor: { type: String, default: "blue-500" },
    content: { type: String, default: "" },
    stats: { type: Array, default: () => [] },
    techStack: { type: Array, default: () => [] },
    personality: { type: Object, default: null },
    timeline: { type: Object, default: null },
  },
};
</script>
