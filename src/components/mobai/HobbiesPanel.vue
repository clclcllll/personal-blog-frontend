<template>
  <div class="w-full md:w-7/12 lg:w-4/7 bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 relative overflow-hidden">
    <div v-if="currentView === 'hobbies'">
      <h2 class="text-3xl font-bold mb-4 text-gray-800">我的爱好</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="hobby in hobbies" :key="hobby.name"
             @mouseenter="handleHover(hobby.name)"
             @mouseleave="handleHoverEnd"
             @click="handleClick(hobby.name)"
             class="bg-gray-100 p-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
          <component :is="hobby.icon" class="w-12 h-12 mx-auto mb-2 text-blue-500" />
          <h3 class="text-lg font-semibold mb-2">{{ hobby.name }}</h3>
          <p class="text-sm text-gray-600">{{ hobby.description }}</p>
        </div>
      </div>
    </div>

    <TravelGallery v-if="currentView === 'travel'" @close="resetView" />
    <GameList v-if="currentView === 'games'" @close="resetView" />
    <MusicPlayer v-if="currentView === 'music'" @close="resetView" />
    <MoviePosters v-if="currentView === 'movies'" @close="resetView" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { hobbies } from './content/hobbiesData.js';
import TravelGallery from './subpanel/TravelGallery.vue';
import GameList from './subpanel/GameList.vue';
import MusicPlayer from './subpanel/MusicPlayer.vue';
import MoviePosters from './subpanel/MoviePosters.vue';

const currentView = ref('hobbies');

const handleHover = (hobbyName) => {
  if (currentView.value === 'hobbies') {
    currentView.value = hobbyName.toLowerCase();
  }
};

const handleHoverEnd = () => {
  if (currentView.value !== 'music' && currentView.value !== 'games' && currentView.value !== 'travel' && currentView.value !== 'movies') {
    currentView.value = 'hobbies';
  }
};

const handleClick = (hobbyName) => {
  currentView.value = hobbyName.toLowerCase();
};

const resetView = () => {
  currentView.value = 'hobbies';
};
</script>
