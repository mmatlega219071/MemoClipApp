import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import VideoList from '../components/VideoList.vue';
import RecordVideo from '../components/RecordVideo.vue';
import AppSettings from '../components/AppSettings.vue';
import LogIn from '../components/LogIn.vue';
import Register from '../components/Register.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/video-list', component: VideoList },
  { path: '/record-video', component: RecordVideo },
  { path: '/app-settings', component: AppSettings },
  { path: '/login', component: LogIn },
  { path: '/register', component: Register },
  { path: '/feed', component:  HelloWorld}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

export default router;
