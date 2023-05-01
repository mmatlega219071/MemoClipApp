import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import VideoList from '../components/VideoList.vue';
import RecordVideo from '../components/RecordVideo.vue';
import AppSettings from '../components/AppSettings.vue';
import LogIn from '../components/LogIn.vue';
import Register from '../components/Register.vue';
import WelcomeScreen from '../components/Welcome.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/video-list', component: VideoList },
  { path: '/record-video', component: RecordVideo },
  { path: '/app-settings', component: AppSettings },
  { path: '/login', component: LogIn },
  { path: '/register', component: Register },
  { path: '/welcome', component: WelcomeScreen }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

export default router;
