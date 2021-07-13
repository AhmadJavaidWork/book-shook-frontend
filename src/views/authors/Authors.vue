<template>
  <div class="container mt-5">
    <div class="text-center d-flex justify-end mb-5">
      <v-pagination
        v-model="currentPage"
        :length="authors.pagination.lastPage"
        :total-visible="totalVisible"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        circle
      ></v-pagination>
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
    </div>
    <v-row no-gutters>
      <v-col
        v-for="author in authors.data"
        :key="author.id"
        sm="12"
        md="6"
        lg="4"
        xl="4"
        class="mx-auto mb-5"
      >
        <AuthorCard :author="author" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import AuthorCard from '@/components/authors/AuthorCard';
import {
  totalVisible,
  pageLimits,
  defaultPerPage,
  firstPage,
} from '@/constants/pagination';

export default {
  name: 'Home',
  components: {
    AuthorCard,
  },
  apollo: {
    authors: {
      query: gql`
        query authorsData($perPage: Int!, $currentPage: Int!) {
          authors(perPage: $perPage, currentPage: $currentPage) {
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
      `,
      variables() {
        return {
          perPage: this.perPage,
          currentPage: this.currentPage,
        };
      },
      update: (data) => data.authors,
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
      authors: {
        data: [],
        pagination: {},
      },
      pageLimits,
      totalVisible,
      perPage: defaultPerPage,
      currentPage: firstPage,
    };
  },
  methods: {
    changeLimit(limit) {
      this.perPage = limit;
    },
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
}
</style>
