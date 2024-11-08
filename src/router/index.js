import { createRouter, createWebHistory } from 'vue-router';

// 定义路由规则，使用懒加载
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
    },
    {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: () => import('@/views/ArticleDetail.vue'),
        props: true,
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import('@/views/Categories.vue'),
    },
    {
        path: '/tags',
        name: 'Tags',
        component: () => import('@/views/Tags.vue'),
    },
    {
        path: '/archive',
        name: 'Archive',
        component: () => import('@/views/Archive.vue'),
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/Search.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
        meta: { requiresGuest: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
        meta: { requiresGuest: true },
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/Admin.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('@/components/admin/Dashboard.vue'),
            },
            {
                path: 'articles',
                name: 'ArticleManage',
                component: () => import('@/components/admin/ArticleManage.vue'),
            },
            {
                path: 'comments',
                name: 'CommentManage',
                component: () => import('@/components/admin/CommentManage.vue'),
            },
            {
                path: 'categories',
                name: 'CategoryManage',
                component: () => import('@/components/admin/CategoryManage.vue'),
            },
            {
                path: 'tags',
                name: 'TagManage',
                component: () => import('@/components/admin/TagManage.vue'),
            },
            {
                path: 'users',
                name: 'UserManage',
                component: () => import('@/components/admin/UserManage.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// //路由守卫
// router.beforeEach((to, from, next) => {
//     const isAuthenticated = store.getters['user/isAuthenticated'];// 通过 store 获取用户认证状态
//     const userRole = store.state.user.userInfo?.role;// 通过 store 获取用户角色
//
//     console.log('Navigating to:', to.name);
//     console.log('Is Authenticated:', isAuthenticated);
//
//     if (to.matched.some(record => record.meta.requiresAuth)) {// 判断路由是否需要身份认证
//         // 需要身份认证的路由
//         if (!isAuthenticated) {
//             next({ name: 'Login' });
//         } else if (to.path.startsWith('/admin') && userRole !== 'admin') {
//             // 非管理员访问后台，重定向到首页
//             next({ name: 'Home' });
//         } else {
//             next();
//         }
//     } else if (to.matched.some(record => record.meta.requiresGuest)) {
//         // 访客路由，已登录用户不能访问
//         if (isAuthenticated) {
//             next({ name: 'Home' });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

export default router;
