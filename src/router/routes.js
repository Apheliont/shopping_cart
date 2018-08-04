import ProductList from '../components/ProductList';
import CartList from '../components/CartList';
import ProductItem from '../components/ProductItem';
import PageNotFound from '../components/PageNotFound';
import Registration from '../components/Registration';
import Login from '../components/Login';

export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/products',
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/products',
    name: 'products',
    component: ProductList,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/cart',
    component: CartList,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/products/:id',
    component: ProductItem,
    props: true,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    name: 'default',
    component: PageNotFound
  }
];
