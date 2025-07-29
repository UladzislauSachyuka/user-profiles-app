<template>
  <v-list nav>
    <v-list-group value="true">
      <template v-slot:activator>
        <v-list-item-title>Профили</v-list-item-title>
      </template>

      <v-list-item to="/" exact :active-class="''">
        <v-list-item-icon>
          <v-icon color="primary">mdi-check-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            :class="{ 'font-weight-medium': $route.path === '/' }"
          >
            Все
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/processed" :active-class="''">
        <v-list-item-icon>
          <v-icon color="primary">mdi-check-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title 
            :class="{ 'font-weight-medium': $route.path === '/processed' }"
          >
            Обработанные
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/unprocessed" :active-class="''">
        <v-list-item-icon>
          <v-icon color="primary">mdi-alert-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            :class="{ 'font-weight-medium': $route.path === '/unprocessed' }"
          >
            Необработанные
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<style scoped>
.v-list-item--link::before {
  background-color: transparent !important;
}
</style>
