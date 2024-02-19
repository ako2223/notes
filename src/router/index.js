import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import AddTask from '../components/AddTask.vue'; // Import the AddTask component

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
    },
    {
      path: '/add-task', // Define the route path for adding a task
      name: 'add-task',
      component: AddTask, // Use the AddTask component for this route
    },
  ],
});

export default router;
