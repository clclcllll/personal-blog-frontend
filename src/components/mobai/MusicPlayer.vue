<template>
  <div
      class="music-player-container flex text-white p-4 rounded-xl h-[220px] relative overflow-hidden"
  >

    <!-- 播放器内容层 -->
    <div class="relative z-10 flex w-full">
      <!-- 左侧：黑胶播放区域 -->
      <div class="left-section w-[45%] flex items-center justify-center relative">
        <!-- 唱臂 -->
        <div class="tonearm absolute top-2 left-1/2 -translate-x-1/2 z-20" :class="{ 'tonearm-playing': isPlaying }">
          <div class="w-[2px] h-16 bg-gray-600 origin-top transform -rotate-45 relative">
            <div class="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <!--唱片-->
        <!-- 唱片 -->
        <div class="record-container relative">
          <div class="record-center absolute left-1/2 top-1/2 w-4 h-4 bg-gray-800 rounded-full z-20 transform -translate-x-1/2 -translate-y-1/2">
            <div class="w-2 h-2 bg-gray-600 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div class="record w-44 h-44 rounded-full overflow-hidden border-[16px] border-[#111] shadow-xl relative">
            <div class="record-texture absolute inset-0 w-full h-full rounded-full"></div>
            <img :src="tracks[currentTrack].poster" alt="Album Cover" class="w-full h-full object-cover animate-spin-slow" :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }" />
          </div>
        </div>

      </div>

      <!-- 右侧：歌曲信息和歌词 -->
      <div class="right-section w-[55%] flex flex-col justify-between pl-6">

        <!-- 歌曲信息 -->
        <div class="song-info space-y-1">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold truncate">{{ trackTitle }}</h2>
            <span class="px-2 py-0.5 text-xs bg-red-500/20 text-red-500 rounded">极高音质</span>
          </div>
          <p class="text-sm text-gray-400 truncate">{{ trackArtist }}</p>
        </div>

        <!-- 歌词区域 -->
        <div class="lyrics-container flex-grow overflow-y-hidden my-2 text-sm relative">
          <ul ref="lyricsList" class="lyrics-list">
            <li v-for="(line, index) in lyrics" :key="index" :class="{ 'text-white font-bold': index === currentLyricIndex, 'text-gray-400': index !== currentLyricIndex }">
              {{ line.text }}
            </li>
          </ul>
        </div>

        <!-- 控制栏 -->
        <div class="controls-and-progress space-y-2">
          <div class="w-full bg-gray-700/50 rounded-full h-1">
            <div class="bg-white h-1 rounded-full transition-all duration-300 ease-in-out" :style="{ width: `${progress}%` }"></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button @click="prevTrack" class="text-gray-400 hover:text-white transition-colors">
                <SkipBackIcon class="w-5 h-5" />
              </button>
              <button @click="togglePlayPause" class="text-white hover:text-gray-200 transition-colors">
                <PlayIcon v-if="!isPlaying" class="w-8 h-8" />
                <PauseIcon v-else class="w-8 h-8" />
              </button>
              <button @click="nextTrack" class="text-gray-400 hover:text-white transition-colors">
                <SkipForwardIcon class="w-5 h-5" />
              </button>
            </div>
            <span class="text-xs text-gray-400">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
          </div>
        </div>

      </div>
    </div>

    <audio ref="audioPlayer" :src="tracks[currentTrack].file" @timeupdate="updateProgress" @loadedmetadata="setDuration" @ended="nextTrack" hidden></audio>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-vue-next';

const props = defineProps({
  tracks: {
    type: Array,
    required: true,
  },
});

const currentTrack = ref(0);
const audioPlayer = ref(null);

const isPlaying = ref(false);
const progress = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const trackTitle = ref("未知标题");
const trackArtist = ref("未知艺术家");


// 定义一个 emit 函数，用于发射 update-poster 事件
const emit = defineEmits(['update-poster']);

// 保存歌词内容
const lyrics = ref([]);
const currentLyricIndex = ref(0);

const playAudio = () => {
  isPlaying.value = true;
  audioPlayer.value.play();
  emitPoster();
};
const pauseAudio = () => {
  isPlaying.value = false;
  audioPlayer.value.pause();
};


const nextTrack = () => {
  currentTrack.value = (currentTrack.value + 1) % props.tracks.length;
  loadLyrics();  // 每次切换歌曲时加载对应的歌词
  playAudio();
};
const prevTrack = () => {
  currentTrack.value = (currentTrack.value - 1 + props.tracks.length) % props.tracks.length;
  loadLyrics();  // 每次切换歌曲时加载对应的歌词
  playAudio();
};

const emitPoster = () => {
  emit('update-poster', props.tracks[currentTrack.value].poster);
}

// 每次切换歌曲时，触发 emitPoster
watch(currentTrack, () => {
  emitPoster();
});


const togglePlayPause = () => {
  if (isPlaying.value) {
    pauseAudio();
  } else {
    playAudio();
  }
};

const updateProgress = () => {
  const { currentTime: time, duration: totalDuration } = audioPlayer.value;
  progress.value = (time / totalDuration) * 100;
  currentTime.value = time;
  updateCurrentLyric(time);
};

const setDuration = () => {
  duration.value = audioPlayer.value.duration;
};
// 格式化时间
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
// 解析歌词
const parseLyrics = (lrc) => {
  const lines = lrc.split('\n');
  return lines.map(line => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.+)/);
    if (match) {
      const time = parseInt(match[1], 10) * 60 + parseFloat(match[2]);
      const text = match[3].trim();
      return { time, text };
    }
  }).filter(line => line);
};
// 更新当前歌词索引
const updateCurrentLyric = (time) => {
  for (let i = lyrics.value.length - 1; i >= 0; i--) {
    if (time >= lyrics.value[i].time) {
      currentLyricIndex.value = i;
      scrollLyrics();
      break;
    }
  }
};

// 自动滚动歌词
const scrollLyrics = () => {
  const lyricsList = document.querySelector('.lyrics-list');
  if (lyricsList) {
    const currentLyric = lyricsList.children[currentLyricIndex.value];
    const offset = currentLyric.offsetTop - lyricsList.offsetTop - lyricsList.clientHeight / 2;
    lyricsList.scrollTop = offset;
  }
};
// 加载歌词
const loadLyrics = async () => {
  const response = await fetch(props.tracks[currentTrack.value].lrc);
  const lrcText = await response.text();
  lyrics.value = parseLyrics(lrcText);

  // 从 LRC 中提取标题和作者信息
  const titleMatch = lrcText.match(/\[ti:(.+)\]/);
  const artistMatch = lrcText.match(/\[ar:(.+)\]/);

  trackTitle.value = titleMatch ? titleMatch[1].trim() : "未知标题";
  trackArtist.value = artistMatch ? artistMatch[1].trim() : "未知艺术家";
};

onMounted(() => {
  loadLyrics();
  playAudio();
});

</script>

<style scoped>
.music-player-container {
  font-family: system-ui, -apple-system, sans-serif;
  background-size: cover;
  background-position: center;
}

.record {
  transition: transform 0.5s ease;
}

.animate-spin-slow {
  animation: spin 12s linear infinite;
  animation-play-state: paused;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.lyrics-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  max-height: 80px;
}

.lyrics-container::-webkit-scrollbar {
  width: 4px;
}

.lyrics-container::-webkit-scrollbar-track {
  background: transparent;
}

.lyrics-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.tonearm {
  transition: transform 0.5s ease;
  transform-origin: top left;
}

.tonearm-playing {
  transform: rotate(25deg);
}

/* 磨砂玻璃背景效果 */
.backdrop-blur-lg {
  backdrop-filter: blur(10px) saturate(150%);
}

.record {
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  border: 16px solid #111;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 8px rgba(0, 0, 0, 0.8);
}

@keyframes spinTexture {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.record-center {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  height: 20px;
  background-color: #111;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
}



</style>
