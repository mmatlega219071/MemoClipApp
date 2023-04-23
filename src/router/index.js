import { createRouter, createWebHistory } from 'vue-router';
import VideoList from '../components/VideoList.vue';
import RecordVideo from '../components/RecordVideo.vue';
import AppSettings from '../components/AppSettings.vue';

const routes = [
  { path: '/video-list', component: VideoList },
  { path: '/record-video', component: RecordVideo },
  { path: '/settings', component: AppSettings }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
