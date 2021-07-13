import Home from '@/views/Home';
import Books from '@/views/Books';
import Authors from '@/views/Authors';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors,
  },
];

export default routes;
