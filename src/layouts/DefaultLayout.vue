<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
    >
      <FilterSidebar />
    </v-navigation-drawer>

    <AppHeader :clipped="$vuetify.breakpoint.lgAndUp" @toggle-drawer="drawer = !drawer" />

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import FilterSidebar from '@/components/FilterSidebar.vue'

export default {
  components: { AppHeader, FilterSidebar },
  data() {
    return {
      drawer: true
    }
  }
}
</script>

<style scoped>
.v-main {
  padding: 0 !important;
}
</style>
