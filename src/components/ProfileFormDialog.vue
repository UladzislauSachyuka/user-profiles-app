<template>
  <v-dialog v-model="internalDialog" max-width="600px" @keydown.esc="close">
    <v-card>
      <v-card-title>{{ isEditing ? 'Редактировать' : 'Добавить' }} профиль</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.firstName" label="Имя" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.lastName" label="Фамилия" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.company" label="Компания" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.position" label="Специальность" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.phone" label="Телефон" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.email" label="E-mail" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.interests" label="Интересы" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close">Отмена</v-btn>
        <v-btn color="primary" @click="submit">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ProfileFormDialog',
  props: {
    value: Boolean,
    isEditing: Boolean,
    selectedProfile: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      internalDialog: this.value,
      form: this.createEmptyForm()
    };
  },
  watch: {
    value(val) {
      this.internalDialog = val;
      if (val) {
        this.form = this.selectedProfile
          ? { ...this.selectedProfile }
          : this.createEmptyForm();
      }
    },
    internalDialog(val) {
      this.$emit('input', val);
    },
    selectedProfile(newProfile) {
      if (this.internalDialog && newProfile) {
        this.form = { ...newProfile };
      }
    }
  },
  methods: {
    createEmptyForm() {
      return {
        firstName: '',
        lastName: '',
        company: '',
        position: '',
        phone: '',
        email: '',
        interests: ''
      };
    },
    close() {
      this.internalDialog = false;
    },
    submit() {
      this.$emit('save', { ...this.form });
      this.close();
    }
  }
};
</script>
