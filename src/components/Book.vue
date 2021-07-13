<template>
  <v-card outlined tile elevation="5" class="book-card">
    <v-img
      :src="book.picture"
      max-height="300px"
      max-width="300px"
      contain
    ></v-img>
    <v-card-text>
      {{ book.name }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Book',
  props: ['book'],
};
</script>

<style scoped>
.book-card {
  max-width: 300px;
  max-height: 500px;
}
</style>
