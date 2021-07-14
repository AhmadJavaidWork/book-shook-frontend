<template>
  <div class="container mt-5">
    <v-row no-gutters class="mb-5">
      <v-col
        :class="classes.paginationClasses"
        cols="12"
        sm="10"
        md="10"
        lg="10"
        xl="10"
      >
        <v-pagination
          v-model="currentPage"
          :length="books.pagination.lastPage"
          :total-visible="totalVisible"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          circle
        ></v-pagination>
      </v-col>
      <v-col
        :class="classes.perPageClasses"
        cols="12"
        sm="2"
        md="2"
        lg="2"
        xl="2"
      >
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="white"
                height="34px"
                class="mt-1 text-capitalize"
              >
                per page {{ perPage }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(pageLimit, index) in pageLimits"
                :key="index"
                @click="changeLimit(pageLimit.text)"
                :disabled="pageLimit.disabled"
              >
                <v-list-item-title>{{ pageLimit.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
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
import BookCard from '@/components/books/BookCard';
import {
  totalVisible,
  pageLimits,
  defaultPerPage,
  firstPage,
} from '@/constants/pagination';
import {
  paginationClasses,
  perPageClasses,
} from '@/constants/classes/booksPage';

export default {
  name: 'Home',
  components: {
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
  data() {
    return {
      lastPage: null,
      books: {
        data: [],
        pagination: {},
      },
      pageLimits,
      totalVisible,
      perPage: defaultPerPage,
      currentPage: firstPage,
      classes: { paginationClasses, perPageClasses },
    };
  },
  methods: {
    changeLimit(limit) {
      this.perPage = limit;
    },
    selectBook(id) {
      this.$router.push({ name: 'Book', params: { id } });
    },
  },
};
</script>
