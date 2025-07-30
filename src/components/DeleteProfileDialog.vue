<template>
  <v-dialog v-model="internalDialog" max-width="400px" @keydown.esc="close">
    <v-card>
      <v-card-title>Удалить профиль</v-card-title>
      <v-card-text>
        Вы уверены, что хотите удалить профиль
        <strong>{{ selectedProfile?.firstName }} {{ selectedProfile?.lastName }}</strong>?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Отмена</v-btn>
        <v-btn color="error" @click="confirmDelete">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteProfileDialog',
  props: {
    value: Boolean,
    selectedProfile: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      internalDialog: this.value
    };
  },
  watch: {
    value(val) {
      this.internalDialog = val;
    },
    internalDialog(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    close() {
      this.internalDialog = false;
    },
    confirmDelete() {
      this.$emit('confirm-delete', this.selectedProfile.id);
      this.close();
    }
  }
};
</script>
