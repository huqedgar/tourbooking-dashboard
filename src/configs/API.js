import axios from 'axios';
import Cookies from 'js-cookie';

export const endpoints = {
    'all-user': '/users/all-users/',
    'current-user': '/users/current-user/',
    'user-id': (userId) => `/users/${userId}/`,
    login: '/o/token/',
    register: '/users/',
    tours: '/tours/',
    'tour-details': (tourId) => `/tours/${tourId}/details-tour/`,
    'tour-comments': (tourId) => `/tours/${tourId}/comments/`,
    'types-customer': '/types-customer/',
    'user-ticket': '/tickets/user-ticket/',
    'create-ticket': '/tickets/create-ticket/',
    'user-update-ticket': '/tickets/user-update-ticket/',
    'my-wish-list': '/wishlist/my-wish-list/',
    'add-wish-list': (tourId) => `/wishlist/${tourId}/add-wish-list/`,
    'add-comment-tour': (tourId) => `/comments/${tourId}/add-comment-tour/`,
    'add-rating-tour': (tourId) => `/rating/${tourId}/add-rating-tour/`,
    blogs: '/blogs/',
    'blog-details': (blogId) => `/blogs/${blogId}/details-blog/`,
    'blog-comments': (blogId) => `/blogs/${blogId}/comments/`,
    'my-like-blog': '/likes-blog/my-like-blog/',
    'add-like-blog': (blogId) => `/likes-blog/${blogId}/add-like-blog/`,
    'add-comment-blog': (blogId) => `/comments-blog/${blogId}/add-comment-blog/`,
    bills: '/bills/',
    'all-bill': '/bills/all-bill/',
    revenue: '/bills/revenue',
    'user-bill': '/bills/user-bill/',
    'update-bill': (billId) => `/bills/${billId}/update-bill/`,
};

export const authAPI = () =>
    axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
            Authorization: `Bearer ${Cookies.get('access-token')}`,
        },
    });

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
