<template>
  <div class="container mt-5">
    <div class="author-overview d-flex">
      <v-img
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
      {{ author.name }}
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Author',
  props: ['id'],
  apollo: {
    author: {
      query: gql`
        query authorData($id: ID!) {
          author(id: $id) {
            id
            name
            picture
          }
        }
      `,
      variables() {
        return {
          id: this.id,
        };
      },
      update: (data) => data.author,
    },
  },
  data() {
    return {
      author: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (!this.id) {
      this.$router.push({ name: 'Authors' });
    }
  },
};
</script>
