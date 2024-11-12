<template>
  <div
      class="music-player-container flex text-white p-4 rounded-xl h-[220px] relative overflow-hidden"
  >
    <!-- 播放器内容层 -->
    <div class="relative z-10 flex w-full">
      <!-- 左侧：黑胶播放区域 -->
      <div class="left-section w-[45%] flex items-center justify-center relative">
        <!-- 唱臂 -->
        <div
            class="tonearm absolute top-2 left-1/2 -translate-x-1/2 z-20"
            :class="{
            'tonearm-playing': isPlaying && !isTonearmMoving,
            'tonearm-paused': !isPlaying && !isTonearmMoving,
            'tonearm-moving': isTonearmMoving
          }"
        >
          <div class="w-[2px] h-16 bg-gray-600 origin-top transform -rotate-45 relative">
            <div class="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <!-- 唱片 -->
        <div class="record-container relative">
          <div
              class="record-center absolute left-1/2 top-1/2 w-4 h-4 bg-gray-800 rounded-full z-20 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div
                class="w-2 h-2 bg-gray-600 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            ></div>
          </div>
          <div
              class="record w-44 h-44 rounded-full overflow-hidden border-[16px] border-[#111] shadow-xl relative"
          >
            <div class="record-texture absolute inset-0 w-full h-full rounded-full"></div>
            <img
                :src="tracks[currentTrack].poster"
                alt="Album Cover"
                class="w-full h-full object-cover animate-spin-slow"
                :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
            />
          </div>
        </div>
      </div>

      <!-- 右侧：歌曲信息和歌词 -->
      <div class="right-section w-[55%] flex flex-col justify-between pl-6">
        <!-- 歌曲信息 -->
        <div class="song-info space-y-1">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold truncate">{{ trackTitle }}</h2>
          </div>
          <p class="text-sm text-gray-400 truncate">{{ trackArtist }}</p>
        </div>

        <!-- 歌词区域 -->
        <div
            ref="lyricsContainer"
            class="lyrics-container text-sm"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
        >
          <ul class="lyrics-list">
            <li
                v-for="(line, index) in lyrics"
                :key="index"
                :class="{
                  'text-white text-sm': index === currentLyricIndex,
                  'text-gray-400': index !== currentLyricIndex
                }"
            >
              {{ line.text }}
            </li>
          </ul>

        </div>

        <!-- 控制栏 -->
        <div class="controls-and-progress space-y-2">
          <div class="w-full bg-gray-700/50 cursor-pointer rounded-full h-1" @click="seekAudio">
            <div
                class="bg-white h-1 rounded-full transition-all duration-300 ease-in-out"
                :style="{ width: `${progress}%` }"
            ></div>
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

    <audio
        ref="audioPlayer"
        :src="tracks[currentTrack].file"
        @timeupdate="updateProgress"
        @loadedmetadata="setDuration"
        @ended="nextTrack"
        hidden
    ></audio>
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
const isTonearmMoving = ref(false); // 唱臂是否正在移动

const lyrics = ref([]);
const currentLyricIndex = ref(0);
const lyricsList = ref(null); // 歌词列表元素

const lyricsContainer = ref(null);



const emit = defineEmits(['update-poster']);

const playAudio = () => {
  isPlaying.value = true;
  audioPlayer.value.play();
  emitPoster();
};
const pauseAudio = () => {
  isPlaying.value = false;
  audioPlayer.value.pause();
};

const resetRecord = () => {
  pauseAudio();
  isPlaying.value = false;

  // 唱臂移开
  isTonearmMoving.value = true;

  setTimeout(() => {
    // 重置音频
    audioPlayer.value.currentTime = 0;
    currentTime.value = 0;
    progress.value = 0;

    // 等待一段时间，让唱臂移开
    setTimeout(() => {
      // 唱臂复位
      isTonearmMoving.value = false;

      // 开始播放新歌曲
      playAudio();
    }, 500); // 调整延迟以匹配动画时间
  }, 500); // 调整延迟以匹配动画时间
};

const nextTrack = () => {
  resetRecord();
  currentTrack.value = (currentTrack.value + 1) % props.tracks.length;
  loadLyrics(); // 每次切换歌曲时加载对应的歌词
};
const prevTrack = () => {

  resetRecord();
  currentTrack.value = (currentTrack.value - 1 + props.tracks.length) % props.tracks.length;
  loadLyrics(); // 每次切换歌曲时加载对应的歌词
};

const emitPoster = () => {
  emit('update-poster', props.tracks[currentTrack.value].poster);
};

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
  const lyricsArray = [];

  for (const line of lines) {
    // 跳过第一行（包含标题和艺术家）
    if (line.startsWith('[00:00')) {
      continue;
    }

    const match = line.match(/\[(\d+):(\d+\.\d+)\](.+)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseFloat(match[2]);
      const time = minutes * 60 + seconds;
      const text = match[3].trim();
      lyricsArray.push({ time, text });
    }
  }
  return lyricsArray;
};

// 更新当前歌词索引
const updateCurrentLyric = (time) => {
  for (let i = lyrics.value.length - 1; i >= 0; i--) {
    if (time >= lyrics.value[i].time) {
      if (currentLyricIndex.value !== i) {
        currentLyricIndex.value = i;
        scrollLyrics();
      }
      break;
    }
  }
};


// 自动滚动歌词
const scrollLyrics = () => {
  if (isDragging.value) {
    return;
  }

  const container = lyricsContainer.value;
  if (container) {
    const currentLyricEl = container.querySelectorAll('.lyrics-list li')[currentLyricIndex.value];

    if (currentLyricEl) {
      const lineHeight = 24; // 与 CSS 中的行高一致
      const containerHeight = container.clientHeight;

      // 计算目标滚动位置
      const scrollTop = currentLyricEl.offsetTop - (containerHeight - lineHeight) / 2;

      // 确保 scrollTop 在有效范围内
      const maxScrollTop = container.scrollHeight - containerHeight;
      const finalScrollTop = Math.max(0, Math.min(scrollTop, maxScrollTop));

      container.scrollTo({
        top: finalScrollTop-60,
        // behavior: 'smooth',
      });
    }
  }
};




// 加载歌词
const loadLyrics = async () => {
  try {
    const response = await fetch(props.tracks[currentTrack.value].lrc);
    const lrcText = await response.text();
    lyrics.value = parseLyrics(lrcText);

    // 从第一行提取标题和艺术家
    const firstLine = lrcText.split('\n')[0];
    const match = firstLine.match(/\[\d+:\d+\.\d+\](.+?)\s*-\s*(.+)/);
    if (match) {
      trackTitle.value = match[1].trim();
      trackArtist.value = match[2].trim();
    } else {
      trackTitle.value = "未知标题";
      trackArtist.value = "未知艺术家";
    }
  } catch (error) {
    console.error("无法加载歌词：", error);
  }
};

const seekAudio = (event) => {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const newTime = (offsetX / progressBar.clientWidth) * duration.value;
  audioPlayer.value.currentTime = newTime;
  currentTime.value = newTime;
  updateProgress();
};

// 拖动歌词
const isDragging = ref(false);
const startY = ref(0);
const initialScrollTop = ref(0);

const startDrag = (event) => {
  isDragging.value = true;
  startY.value = event.clientY;
  initialScrollTop.value = lyricsContainer.value.scrollTop;

  // 启用滚动
  // lyricsContainer.value.style.overflowY = 'scroll';
};

const onDrag = (event) => {
  if (isDragging.value) {
    const deltaY = event.clientY - startY.value;
    lyricsContainer.value.scrollTop = initialScrollTop.value - deltaY;
  }
};

let dragTimeout;
const endDrag = () => {
  isDragging.value = false;
  // 隐藏滚动条
  // lyricsContainer.value.style.overflowY = 'hidden';

  clearTimeout(dragTimeout);
  dragTimeout = setTimeout(() => {
    // 恢复自动滚动
    scrollLyrics();
  }, 5000);// 调整延迟以匹配动画时间
};

onMounted(() => {
  loadLyrics();
  playAudio();
  scrollLyrics(); // 初始化时滚动到当前歌词
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
  max-height: 69px;
  overflow-y: scroll; /* 始终允许滚动 */
  user-select: none;
  cursor: grab;

  /* 隐藏滚动条的样式 */
  scrollbar-width: none; /* 适用于Firefox */
  -ms-overflow-style: none; /* 适用于IE和Edge */
}

.lyrics-container::-webkit-scrollbar {
  display: none; /* 适用于Chrome、Safari和Opera */
}

.lyrics-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.lyrics-list li {
  height: 24px;
  line-height: 24px;
  text-align: left;
}

.tonearm {
  transition: transform 0.5s ease;
  transform-origin: top left;
}

.tonearm-playing {
  transform: rotate(25deg);
}

.tonearm-paused {
  transform: rotate(-45deg);
}

.tonearm-moving {
  transform: rotate(-50deg); /* 唱臂移开的位置 */
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
