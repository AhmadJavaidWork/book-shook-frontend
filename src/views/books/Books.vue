<template>
  <div class="container mt-5">
    <Pagination
      v-if="!$apollo.loading"
      :lastPage="lastPage"
      :currentPage="currentPage"
      :perPage="perPage"
      :total="total"
      @changeLimit="changeLimit"
      @changePage="changePage"
    />
    <v-row no-gutters>
      <v-col
        v-for="book in books.data"
        :key="book.id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        class="mx-auto mb-5"
      >
        <BookCard
          :book="book"
          :author="book.author"
          @click="selectBook(book.id)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Pagination from '@/components/app/Pagination';
import BookCard from '@/components/books/BookCard';
import { defaultPerPage, firstPage } from '@/constants/pagination';

export default {
  name: 'Home',
  components: {
    Pagination,
    BookCard,
  },
  apollo: {
    books: {
      query: gql`
        query booksData($perPage: Int!, $currentPage: Int!) {
          books(perPage: $perPage, currentPage: $currentPage) {
            data {
              id
              name
              picture
              author {
                id
                name
              }
            }
            pagination {
              total
              lastPage
              perPage
              currentPage
              from
              to
            }
          }
        }
      `,
      variables() {
        return {
          perPage: this.perPage,
          currentPage: this.currentPage,
        };
      },
      update: (data) => data.books,
    },
    author: gql`
      query {
        author(id: 1) {
          name
        }
      }
    `,
  },
  watch: {
    books() {
      if (this.books.pagination.lastPage) {
        this.lastPage = this.books.pagination.lastPage;
        this.total = this.books.pagination.total;
      }
    },
  },
  data() {
    return {
      lastPage: null,
      total: 0,
      books: {
        data: [],
        pagination: {},
      },
      perPage: defaultPerPage,
      currentPage: firstPage,
    };
  },
  methods: {
    changeLimit(limit) {
      this.perPage = limit;
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    selectBook(id) {
      this.$router.push({ name: 'Book', params: { id } });
    },
  },
};
</script>
