<!-- src/views/About.vue -->
<template>

  <!-- 主页面容器，最小高度设为屏幕高度，背景颜色为浅灰，内容居中 -->
  <div class="min-h-screen bg-gray-50 flex flex-col items-center pt-16"> <!-- 添加 pt-16 内边距 -->
    <Navbar/>
    <!-- 引入个人资料组件 -->
    <ProfileSection />

    <!-- 主内容区 -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- 个人简介面板 -->
        <InfoPanel
            title="你好,很高兴认识你"
            iconClass="fa-info-circle"
            backgroundColor="blue-500"
            textColor="white"
            iconColor="white"
            content="Full Stack Developer & CV Engineer"
        />

        <!-- 关于本站面板 -->
        <InfoPanel
            title="关于本站"
            iconClass="fa-info-circle"
            content="一个使用 Vue3 和现代技术构建的个人博客。"
        />

        <!-- 访客统计面板 -->
        <InfoPanel
            title="访客统计"
            iconClass="fa-chart-line"
            stats="[{ value: '66', label: '今日访问' }, { value: '346', label: '本月访问' }]"
        />

        <!-- 技术栈面板 -->
        <InfoPanel
            title="技术栈"
            iconClass="fa-layer-group"
            techStack="[
            { icon: 'fab fa-vuejs text-green-500', label: 'Vue.js' },
            { icon: 'fab fa-node-js text-green-600', label: 'Node.js' },
            { icon: 'fab fa-python text-blue-500', label: 'Python' }
          ]"
        />

        <!-- 性格类型面板 -->
        <InfoPanel
            title="性格类型"
            iconClass="fa-user-circle"
            personality="{ type: 'INFP-T', description: '调停者' }"
        />

        <!-- 时间轴面板 -->
        <InfoPanel
            title="时间轴"
            iconClass="fa-clock"
            timeline="{ start: '2023', end: '至今', progress: '2/3' }"
        />

      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue'; // 导入导航栏组件
import ProfileSection from "@/components/common/UserProfile.vue"; // 导入个人资料部分组件
import InfoPanel from "@/components/common/InfoPanel.vue"; // 导入信息面板组件

export default {
  name: 'AboutPage',
  components: {
    ProfileSection,
    InfoPanel,
    Navbar,
  },
};
</script>
