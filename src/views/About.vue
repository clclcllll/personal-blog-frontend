<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center pt-20">
    <Navbar />
    <ProfileSection />

    <div class="container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        <!-- 每行的两个组件放在同一个 div 块中 -->

        <div class="flex flex-col md:flex-row gap-6 h-[200px]">
          <PersonalInfoPanel class="flex-grow h-full" />
          <AboutSitePanel class="flex-grow h-full" />
        </div>

        <div class="flex flex-col md:flex-row gap-6 h-[250px]">
          <VisitorStatsPanel class="flex-grow h-full" />
          <TechStackPanel class="flex-grow h-full" />
        </div>

        <div class="flex flex-col md:flex-row gap-6 h-[350px]">
          <PhotoPanel class="flex-grow h-full" />
          <GoalsPanel class="flex-grow h-full" />
        </div>

        <div class="flex flex-col md:flex-row gap-6 h-[200px]">
          <ContactPanel class="flex-grow h-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar.vue';
import ProfileSection from "@/components/common/UserProfile.vue";
import PersonalInfoPanel from '@/components/mobai/PersonalInfoPanel.vue';
import AboutSitePanel from '@/components/mobai/AboutSitePanel.vue';
import VisitorStatsPanel from '@/components/mobai/VisitorStatsPanel.vue';
import TechStackPanel from '@/components/mobai/TechStackPanel.vue';
import PhotoPanel from '@/components/mobai/PhotoPanel.vue';
import GoalsPanel from '@/components/mobai/GoalsPanel.vue';
import ContactPanel from '@/components/mobai/ContactPanel.vue';

export default {
  name: 'AboutPage',
  components: {
    Navbar,
    ProfileSection,
    PersonalInfoPanel,
    AboutSitePanel,
    VisitorStatsPanel,
    TechStackPanel,
    PhotoPanel,
    GoalsPanel,
    ContactPanel,
  },
};
</script>
