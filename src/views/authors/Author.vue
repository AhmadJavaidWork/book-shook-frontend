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
    <v-row no-gutters class="mt-10">
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
        <v-row no-gutters class="mb-5">
          <v-col
            :class="classes.paginationInnerClasses"
            cols="12"
            sm="10"
            md="10"
            lg="10"
            xl="10"
          >
            <v-pagination
              v-model="currentPage"
              :length="author.books.pagination.lastPage"
              :total-visible="totalVisible"
              prev-icon="mdi-menu-left"
              next-icon="mdi-menu-right"
              circle
            ></v-pagination>
          </v-col>
          <v-col
            :class="classes.paginationPerPageClasses"
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
import BookCard from '@/components/books/BookCard';
import {
  totalVisible,
  pageLimits,
  defaultPerPage,
  firstPage,
} from '@/constants/pagination';
import {
  bioClasses,
  bookTextClasses,
  paginationOuterClasses,
  paginationInnerClasses,
  paginationPerPageClasses,
} from '@/constants/classes/authorPage';

export default {
  name: 'Author',
  props: ['id'],
  components: {
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
  data() {
    return {
      lastPage: null,
      author: {
        books: {
          data: [],
          pagination: {},
        },
      },
      pageLimits,
      totalVisible,
      perPage: defaultPerPage,
      currentPage: firstPage,
      classes: {
        bioClasses,
        bookTextClasses,
        paginationOuterClasses,
        paginationInnerClasses,
        paginationPerPageClasses,
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
  },
};
</script>
