<template>
  <div>
    <v-card>
      <v-img :src="book.picture"></v-img>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Book",
  props: ["book"],
};
</script>
