<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" right app temporary width="400">
    <v-form class="pa-4">
      <v-text-field v-model="localFilters.firstName" label="Имя" />
      <v-text-field v-model="localFilters.lastName" label="Фамилия" />
      <v-text-field v-model="localFilters.company" label="Компания" />
      <v-text-field v-model="localFilters.position" label="Специальность" />
      <v-text-field v-model="localFilters.phone" label="Телефон" />
      <v-text-field v-model="localFilters.email" label="E-mail" />
      <v-text-field v-model="localFilters.interests" label="Интересы" />

      <v-spacer></v-spacer>

      <div class="search-actions">
        <v-btn text class="text-none" @click="onClear">Очистить</v-btn>
        <v-btn color="primary" class="text-none" @click="onApply">Применить</v-btn>
      </div>
    </v-form>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'ProfileSearchDrawer',
  props: {
    value: Boolean,
    filters: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localFilters: { ...this.filters }
    };
  },
  watch: {
    filters: {
      deep: true,
      handler(newFilters) {
        this.localFilters = { ...newFilters };
      }
    }
  },
  methods: {
    onApply() {
      this.$emit('apply', { ...this.localFilters });
      this.$emit('input', false);
    },
    onClear() {
      this.localFilters = {
        firstName: '',
        lastName: '',
        company: '',
        position: '',
        phone: '',
        email: '',
        interests: ''
      };
      this.$emit('clear');
    }
  }
}
</script>

<style scoped>
.search-actions {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.search-actions .v-btn {
  min-width: 116px;
}
</style>
