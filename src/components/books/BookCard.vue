<template>
  <v-card outlined tile elevation="5" class="book-card mx-auto">
    <v-img
      :aspect-ratio="1 / 1"
      :lazy-src="book.picture"
      :src="book.picture"
      contain
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
    <v-card-text>
      {{ book.name }}
      <br />
      ~ {{ author.name }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BookCard',
  props: ['book', 'author'],
};
</script>

<style scoped>
.book-card {
  max-width: 300px;
}
</style>
