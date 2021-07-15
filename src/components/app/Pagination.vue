<template>
  <div v-if="hasItems">
    <v-row no-gutters class="mb-5">
      <v-col
        :class="paginationClasses"
        cols="12"
        sm="12"
        md="12"
        lg="10"
        xl="10"
      >
        <v-pagination
          v-model="activePage"
          :length="lastPage"
          :total-visible="visibleLimit"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          circle
          @input="$emit('changePage', activePage)"
          @next="$emit('changePage', activePage)"
          @previous="$emit('changePage', activePage)"
        ></v-pagination>
      </v-col>
      <v-col :class="perPageClasses" cols="12" sm="12" md="12" lg="2" xl="2">
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="white"
                height="34px"
                class="mt-1 text-capitalize"
              >
                per page {{ perPage }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(pageLimit, index) in pageLimits"
                :key="index"
                @click="$emit('changeLimit', pageLimit.text)"
                :disabled="pageLimit.disabled"
              >
                <v-list-item-title>{{ pageLimit.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  defaultTotalVisible,
  pageLimits,
  paginationClasses,
  perPageClasses,
} from '@/constants/pagination';

export default {
  name: 'Pagination',
  props: ['lastPage', 'currentPage', 'perPage', 'total', 'totalVisible'],
  computed: {
    hasItems() {
      if (this.total > 0) return true;
      return false;
    },
  },
  data() {
    return {
      activePage: this.currentPage,
      visibleLimit: this.totalVisible || defaultTotalVisible,
      pageLimits,
      paginationClasses,
      perPageClasses,
    };
  },
};
</script>
