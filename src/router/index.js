import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import VideoList from '../components/VideoList.vue';
import AppSettings from '../components/AppSettings.vue';
import LogIn from '../components/LogIn.vue';
import Register from '../components/Register.vue';
import WelcomeScreen from '../components/Welcome.vue';
import UsersRanking from '../components/UsersRanking.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/video-list', component: VideoList },
  { path: '/app-settings', component: AppSettings },
  { path: '/login', component: LogIn },
  { path: '/register', component: Register },
  { path: '/welcome', component: WelcomeScreen },
  { path: '/users-ranking', component: UsersRanking }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
});

export default router;
