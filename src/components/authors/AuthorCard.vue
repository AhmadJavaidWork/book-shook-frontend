<template>
  <v-card
    outlined
    tile
    elevation="5"
    class="author-card mx-auto"
    @click="$emit('click')"
  >
    <v-img
      :aspect-ratio="1 / 1"
      :lazy-src="author.picture"
      :src="author.picture"
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
      {{ author.name }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AuthorCard',
  props: ['author'],
};
</script>

<style scoped>
.author-card {
  max-width: 300px;
}
</style>
