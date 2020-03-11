import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    meta: {
      title: '主页面',
      auth: true
    },
    children: [
      {
        path: '/',
        name: 'ArticleList',
        redirect: 'list'
      },
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('../views/article_list.vue')
      },
      {
        path: 'create',
        name: 'ArticleCrate',
        component: () => import('../views/article_create.vue')
      },
      {
        path: '/articles/:id/edit',
        name: 'EditArticle',
        component: () => import('../views/edit_article.vue')
      }
    ]
  }
];

const router = new VueRouter({ routes, mode: 'history' });

export default router;
