<template>
  <div
      class="hobbies-panel w-full md:w-7/12 lg:w-4/7 py-6 rounded-lg shadow-md transform transition-transform duration-300 relative overflow-hidden"
      :style="{
        backgroundImage: currentTab === 'music' && currentMusicPoster ? `url(${currentMusicPoster})` : currentBackgroundImage ? `url(${currentBackgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: currentTab === 'music' ? 'blur(10px)' : 'none'
      }"
  >
    <!--音乐背景模糊-->
    <div
        v-if="currentTab === 'music'"
        class="absolute inset-0 bg-black/40 backdrop-blur-lg rounded-lg"
    ></div>

    <!-- 标题和切换按钮容器 -->
    <div class="flex px-6 justify-between items-center ">
      <h2
          class="text-3xl font-bold z-10"
          :class="{'text-black': currentTab === 'movies' && currentImageIndex === 3,'text-white': !(currentTab === 'movies' && currentImageIndex === 3)}"
      >
        爱好
      </h2>

      <div class="flex space-x-4">
        <!-- 电影图标 -->
        <div class="relative group">
          <i class="fas fa-film text-yellow-500 text-3xl cursor-pointer hover:scale-110 transition-transform duration-200"
             @click="switchTab('movies')" :class="{ 'opacity-50': currentTab !== 'movies' }"></i>
          <span class="tooltip-text opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs text-white font-semibold whitespace-nowrap">电影</span>
        </div>

        <!-- 游戏图标 -->
        <div class="relative group">
          <i class="fas fa-gamepad text-green-500 text-3xl cursor-pointer hover:scale-110 transition-transform duration-200"
             @click="switchTab('games')" :class="{ 'opacity-50': currentTab !== 'games' }"></i>
          <span class="tooltip-text opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs text-white font-semibold whitespace-nowrap">游戏</span>
        </div>

        <!-- 音乐图标 -->
        <div class="relative group">
          <i class="fas fa-music text-red-500 text-3xl cursor-pointer hover:scale-110 transition-transform duration-200"
             @click="switchTab('music')" :class="{ 'opacity-50': currentTab !== 'music' }"></i>
          <span class="tooltip-text opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs text-white font-semibold whitespace-nowrap">音乐</span>
        </div>
        <!-- 旅行图标 -->
        <div class="relative group">
          <i class="fas fa-plane text-blue-500 text-3xl cursor-pointer hover:scale-110 transition-transform duration-200"
             @click="switchTab('travel')" :class="{ 'opacity-50': currentTab !== 'travel' }"></i>
          <span class="tooltip-text opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs text-white font-semibold whitespace-nowrap">旅行</span>
        </div>

      </div>
    </div>

    <!-- 图片指示器 -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
      <button
          v-for="(image, index) in getImagesForCurrentTab()"
          :key="index"
          @click="setCurrentPhoto(index)"
          class="w-3 h-3 rounded-full"
          :class="index === currentImageIndex ? 'bg-white' : 'bg-gray-300'"
      ></button>
    </div>

    <MusicPlayer
        v-if="currentTab === 'music'"
        :tracks="hobbiesData.music.tracks"
        @update-poster="updateMusicPoster"
    />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { hobbiesData } from './content/hobbiesData.js';
import MusicPlayer from './MusicPlayer.vue';

export default {
  name: 'HobbiesPanel',
  components: { MusicPlayer },
  setup() {
    const currentTab = ref('movies');
    const currentMusicPoster = ref('');
    const currentBackgroundImage = ref('');
    const currentImageIndex = ref(0);
    let preloadedImages = {}; // 新增预加载图片对象
    const lastSwitchTime = ref(Date.now());

    const preloadImage = (url) => { // 新增图片预加载函数
      if (!preloadedImages[url]) {
        const img = new Image();
        img.src = url;
        preloadedImages[url] = img;
      }
    };

    const updateMusicPoster = (poster) => {
      currentMusicPoster.value = poster;
    };

    const getImagesForCurrentTab = () => hobbiesData[currentTab.value]?.images || [];

    const updateBackgroundImage = () => { // 更新背景图片并预加载下一张
      const images = getImagesForCurrentTab();
      if (images.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
        currentBackgroundImage.value = images[currentImageIndex.value];
        preloadImage(images[(currentImageIndex.value + 1) % images.length]); // 预加载下一张图片
      }
    };

    const switchTab = async (tab) => { // 切换标签，重置背景图并预加载
      currentTab.value = tab;
      if (tab === 'music') {
        currentBackgroundImage.value = '';
        toggleAutoSwitch(false);
      } else {
        currentImageIndex.value = 0;
        currentBackgroundImage.value = getImagesForCurrentTab()[0];
        preloadImage(getImagesForCurrentTab()[1]); // 预加载下一张图片
        toggleAutoSwitch(true);
      }
    };

    let intervalId;
    let resumeAutoSwitchTimer;
    const toggleAutoSwitch = (start) => {
      if (start) {
        // 清除现有计时器并重新开始，确保每次间隔固定
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          const now = Date.now();
          if (now - lastSwitchTime.value >= 3000) { // 3 秒切换时间
            lastSwitchTime.value = now;
            updateBackgroundImage();
          }
        }, 3000);
      } else {
        clearInterval(intervalId);
      }
    };
    const setCurrentPhoto = (index) => {
      currentImageIndex.value = index;
      currentBackgroundImage.value = getImagesForCurrentTab()[index];
      preloadImage(getImagesForCurrentTab()[(index + 1) % getImagesForCurrentTab().length]);

      // 暂停自动切换并设置恢复计时器
      toggleAutoSwitch(false);
      if (resumeAutoSwitchTimer) {
        clearTimeout(resumeAutoSwitchTimer);
      }
      resumeAutoSwitchTimer = setTimeout(() => {
        toggleAutoSwitch(true);
      }, 500); // 0.5 秒后恢复自动切换
    };


    onMounted(() => {
      switchTab(currentTab.value);
    });

    onUnmounted(() => {
      toggleAutoSwitch(false);
      if (resumeAutoSwitchTimer) {
        clearTimeout(resumeAutoSwitchTimer);
      }
    });

    return {
      currentTab,
      currentBackgroundImage,
      switchTab,
      hobbiesData,
      currentMusicPoster,
      updateMusicPoster,
      currentImageIndex,
      setCurrentPhoto,
      getImagesForCurrentTab,
    };
  }
};
</script>

<style scoped>
.text-white {
  color: white;
}
.hobbies-panel {
  transition: background-image 0.5s ease;
}
.opacity-50 {
  opacity: 0.5;
}

.flex i {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.flex i:hover {
  transform: scale(1.15);
}
.hobbies-panel {
  transition: background-image 0.5s ease;
}

</style>
