<template>
  <div class="home">
    <Book v-for="(book, index) in books" :key="index" />
  </div>
</template>

<script>
import Book from '@/components/Book.vue';

export default {
  name: 'Home',
  components: {
    Book,
  },
};
</script>
