<template>
  <div class="container mt-5">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="4" lg="3" xl="2">
        <v-img
          class="mx-auto"
          :aspect-ratio="1 / 1"
          :lazy-src="author.picture"
          :src="author.picture"
          contain
          max-height="300"
          max-width="300"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col class="mt-5" cols="12" sm="8" md="8" lg="9" xl="10">
        <p :class="classes.bioClasses">
          {{ author.name }}
        </p>
        <p>{{ author.bio }}</p>
      </v-col>
    </v-row>
    <v-row v-if="hasBooks" no-gutters class="mt-10">
      <v-col cols="12" sm="3" md="3" lg="3" xl="2">
        <p :class="classes.bookTextClasses">Books</p>
      </v-col>
      <v-col
        :class="classes.paginationOuterClasses"
        cols="12"
        sm="9"
        md="9"
        lg="9"
        xl="10"
      >
        <Pagination
          v-if="!$apollo.loading"
          :lastPage="lastPage"
          :currentPage="currentPage"
          :perPage="perPage"
          :total="total"
          @changeLimit="changeLimit"
          @changePage="changePage"
        />
      </v-col>
    </v-row>
    <v-row no-gutters class="mt-10">
      <v-col
        v-for="book in author.books.data"
        :key="book.id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        class="mx-auto mb-5"
      >
        <BookCard :book="book" :author="author" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Pagination from '@/components/app/Pagination';
import BookCard from '@/components/books/BookCard';
import { defaultPerPage, firstPage } from '@/constants/pagination';
import {
  bioClasses,
  bookTextClasses,
  paginationOuterClasses,
} from '@/constants/classes/authorPage';

export default {
  name: 'Author',
  props: ['id'],
  components: {
    Pagination,
    BookCard,
  },
  apollo: {
    author: {
      query: gql`
        query authorData($id: ID!, $perPage: Int!, $currentPage: Int!) {
          author(id: $id) {
            id
            name
            picture
            bio
            books(perPage: $perPage, currentPage: $currentPage) {
              data {
                id
                name
                picture
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
        }
      `,
      variables() {
        return {
          id: this.id,
          perPage: this.perPage,
          currentPage: this.currentPage,
        };
      },
      update: (data) => data.author,
    },
  },
  computed: {
    hasBooks() {
      if (this.author.books.pagination.total === 0) return false;
      return true;
    },
  },
  watch: {
    author() {
      if (this.author.books.pagination.lastPage) {
        this.lastPage = this.author.books.pagination.lastPage;
        this.total = this.author.books.pagination.total;
      }
    },
  },
  data() {
    return {
      lastPage: null,
      total: 0,
      author: {
        books: {
          data: [],
          pagination: {},
        },
      },
      perPage: defaultPerPage,
      currentPage: firstPage,
      classes: {
        bioClasses,
        bookTextClasses,
        paginationOuterClasses,
      },
    };
  },
  created() {
    if (!this.id) {
      this.$router.push({ name: 'Authors' });
    }
  },
  methods: {
    changeLimit(limit) {
      this.perPage = limit;
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
};
</script>
