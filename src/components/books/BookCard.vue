<template>
  <v-card
    outlined
    tile
    elevation="5"
    class="book-card mx-auto"
    @click="$emit('click')"
  >
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
    <p class="ml-5 mt-2 mb-0 text-body-1">{{ book.name }}</p>
    <p class="ml-5 mb-2 text-caption">
      <a
        class="text-decoration-none"
        @click="
          $router
            .push({ name: 'Author', params: { id: author.id } })
            .catch((err) => {})
        "
        >~ {{ author.name }}</a
      >
    </p>
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
