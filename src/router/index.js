import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import VideoList from '../components/VideoList.vue';
import RecordVideo from '../components/RecordVideo.vue';
import AppSettings from '../components/AppSettings.vue';

const routes = [
  { path: '', component: HelloWorld },
  { path: '/video-list', component: VideoList },
  { path: '/record-video', component: RecordVideo },
  { path: '/app-settings', component: AppSettings }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;
