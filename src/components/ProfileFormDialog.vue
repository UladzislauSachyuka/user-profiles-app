<template>
  <v-dialog v-model="internalDialog" max-width="600px" @keydown.esc="close">
    <v-card>
      <v-card-title>{{ isEditing ? 'Редактировать' : 'Добавить' }} профиль</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="formValid">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.firstName"
                  label="Имя"
                  :rules="[requiredRule]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.lastName"
                  label="Фамилия"
                  :rules="[requiredRule]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.company"
                  label="Компания"
                  :rules="[requiredRule]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.position"
                  label="Специальность"
                  :rules="[requiredRule]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.phone"
                  label="Телефон"
                  :rules="[requiredRule, phoneRule]"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.email"
                  label="E-mail"
                  :rules="[requiredRule, emailRule]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.interests"
                  label="Интересы"
                  :rules="[requiredRule]"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text class="text-none" @click="close">Отмена</v-btn>
        <v-btn color="primary" class="text-none" @click="submit">Сохранить</v-btn>
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
      formValid: true,
      form: this.createEmptyForm(),
      requiredRule: v => !!v || 'Поле обязательно',
      emailRule: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Неверный email',
      phoneRule: v => !v || /^\+?\d{7,15}$/.test(v) || 'Неверный номер'
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
      const form = this.$refs.form;
      if (form && form.validate()) {
        this.$emit('save', { ...this.form });
        this.close();
      }
    }
  }
};
</script>
