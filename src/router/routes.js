import Home from '@/views/Home';
import Books from '@/views/books/Books';
import Book from '@/views/books/Book';
import Authors from '@/views/authors/Authors';
import Author from '@/views/authors/Author';

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
    path: '/book/:id',
    name: 'Book',
    component: Book,
    props: true,
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors,
  },
  {
    path: '/author/:id',
    name: 'Author',
    component: Author,
    props: true,
  },
];

export default routes;
