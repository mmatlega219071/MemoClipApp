import { createRouter, createWebHistory } from 'vue-router';
import Register from '../components/Register.vue';
import Home from '../components/Home.vue';
import VideoList from '../components/VideoList.vue';
import RecordVideo from '../components/RecordVideo.vue';
import AppSettings from '../components/AppSettings.vue';
import LogIn from '../components/LogIn.vue';
import WelcomeSite from '../components/Welcome.vue';


const routes = [
  { path: '/welcome', component: WelcomeSite },
  { path: '/', component: Home },
  { path: '/video-list', component: VideoList },
  { path: '/record-video', component: RecordVideo },
  { path: '/app-settings', component: AppSettings },
  { path: '/login', component: LogIn },
  { path: '/register', component: Register }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

export default router;
