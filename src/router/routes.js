import Home from '@/views/Home';
import Books from '@/views/books/Books';
import Authors from '@/views/authors/Authors';

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
