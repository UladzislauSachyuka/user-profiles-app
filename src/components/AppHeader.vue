<template>
  <v-app-bar app color="primary" dark :clipped-left="clipped">
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" x-large/>
    <v-spacer />
    <v-btn icon class="white mr-4" small @click="$emit('toggle-search')">
      <v-icon color="primary">mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    clipped: {
      type: Boolean,
      default: false
    }
  }
}
</script>