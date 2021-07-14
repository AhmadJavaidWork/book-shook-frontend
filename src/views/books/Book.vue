<template>
  <div class="container mt-5">
    <v-row no-gutters>
      <v-col cols="12" sm="4" md="4" lg="3" xl="2">
        <v-img
          class="mx-auto"
          :aspect-ratio="1 / 1"
          :lazy-src="book.picture"
          :src="book.picture"
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
        <p :class="classes.descClasses">
          {{ book.name }}
        </p>
        <p>{{ book.description }}</p>
      </v-col>
    </v-row>
    <p class="mt-10" :class="classes.plotTextClasses">Plot Summary</p>
    <p class="mt-5" v-if="!readMore">
      <span>{{ book.plotSummary.slice(0, 500) }}</span
      >...
      <a @click="readMore = true"> Read more</a>
    </p>
    <p class="mt-5" v-else>
      <span v-html="book.plotSummary"></span>
      <a @click="readMore = false"> Read less</a>
    </p>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { descClasses, plotTextClasses } from '@/constants/classes/bookPage';

export default {
  name: 'Book',
  props: ['id'],
  apollo: {
    book: {
      query: gql`
        query bookData($id: ID!) {
          book(id: $id) {
            id
            name
            genre
            picture
            description
            plotSummary
          }
        }
      `,
      variables() {
        return {
          id: this.id,
        };
      },
      update: (data) => data.book,
    },
  },
  watch: {
    book() {
      if (this.book.plotSummary) {
        this.book.plotSummary = this.book.plotSummary.replaceAll(
          '\n',
          '<br />'
        );
      }
    },
  },
  data() {
    return {
      book: { plotSummary: '' },
      readMore: false,
      classes: {
        descClasses,
        plotTextClasses,
      },
    };
  },
  created() {
    if (!this.id) {
      this.$router.push({ name: 'Authors' });
    }
  },
};
</script>
