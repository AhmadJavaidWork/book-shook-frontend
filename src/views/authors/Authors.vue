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
        v-for="author in authors.data"
        :key="author.id"
        sm="12"
        md="6"
        lg="4"
        xl="4"
        class="mx-auto mb-5"
      >
        <AuthorCard :author="author" @click="selectAuthor(author.id)" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Pagination from '@/components/app/Pagination';
import AuthorCard from '@/components/authors/AuthorCard';
import { defaultPerPage, firstPage } from '@/constants/pagination';

export default {
  name: 'Home',
  components: {
    Pagination,
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
  watch: {
    authors() {
      if (this.authors.pagination.lastPage) {
        this.lastPage = this.authors.pagination.lastPage;
        this.total = this.authors.pagination.total;
      }
    },
  },
  data() {
    return {
      lastPage: null,
      total: 0,
      authors: {
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
    selectAuthor(id) {
      this.$router.push({ name: 'Author', params: { id } });
    },
  },
};
</script>
