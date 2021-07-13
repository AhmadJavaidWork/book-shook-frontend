<template>
  <div class="container">
    <v-row no-gutters>
      <v-col
        v-for="book in books"
        :key="book.id"
        sm="12"
        md="6"
        lg="4"
        xl="4"
        class="mx-auto mb-5"
      >
        <Book :book="book" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Book from '@/components/Book';

export default {
  name: 'Home',
  components: {
    Book,
  },
  apollo: {
    books: gql`
      query {
        books {
          id
          name
          picture
          author {
            id
            name
          }
        }
      }
    `,
  },
};
</script>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
}
</style>
