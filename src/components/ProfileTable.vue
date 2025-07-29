<template>
  <div class="table-container">
    <v-data-table
      :headers="computedHeaders"
      :items="filteredProfiles"
      item-key="id"
      class="elevation-1 fill-height"
      :footer-props="{ 'items-per-page-options': [5, 10, 20, -1] }"
      @click:row="selectRow"
      :item-class="getRowClass"
    >
      <template v-slot:top>
        <div class="table-header justify-space-between">
          <div class="d-flex align-center">
            <span class="table-label">{{ routeLabel }}</span>
            <v-btn icon @click="$emit('refresh')" class="ml-2">
              <svg-icon type="mdi" :path="mdiRefresh" />
            </v-btn>
          </div>

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Действия
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="openAddDialog">
                <v-list-item-title>Добавить</v-list-item-title>
              </v-list-item>
              <v-list-item :disabled="!selected" @click="openEditDialog">
                <v-list-item-title>Изменить</v-list-item-title>
              </v-list-item>
              <v-list-item :disabled="!selected" @click="openDeleteDialog">
                <v-list-item-title>Удалить</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <component
          v-if="showStatusColumn"
          :is="getStatusIconComponent(item.status)"
        />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="600px">
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
          <v-btn text @click="dialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="save">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title>Удалить профиль</v-card-title>
        <v-card-text>
          Вы уверены, что хотите удалить профиль {{ selected?.firstName }} {{ selected?.lastName }}?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="deleteDialog = false">Отмена</v-btn>
          <v-btn color="error" @click="remove">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCloudCheckVariant, mdiRefresh } from '@mdi/js';
import UnprocessedIcon from '@/components/UnprocessedIcon.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  props: ['profiles'],
  components: {
    SvgIcon,
    UnprocessedIcon
  },
  data() {
    return {
      mdiRefresh,
      selected: null,
      dialog: false,
      deleteDialog: false,
      isEditing: false,
      form: {
        firstName: '',
        lastName: '',
        company: '',
        position: '',
        phone: '',
        email: '',
        interests: ''
      }
    }
  },
  computed: {
    ...mapGetters('profiles', ['all', 'processed', 'unprocessed']),
    filteredProfiles() {
      switch (this.$route.path) {
        case '/processed': return this.processed;
        case '/unprocessed': return this.unprocessed;
        default: return this.all;
      }
    },
    showStatusColumn() {
      return this.$route.path === '/';
    },
    computedHeaders() {
      const baseHeaders = [
        { text: 'Имя', value: 'firstName' },
        { text: 'Фамилия', value: 'lastName' },
        { text: 'Компания', value: 'company' },
        { text: 'Специальность', value: 'position' },
        { text: 'Телефон', value: 'phone' },
        { text: 'E-mail', value: 'email' },
        { text: 'Интересы', value: 'interests' }
      ];
      return this.showStatusColumn
        ? [{ text: 'Статус', value: 'status' }, ...baseHeaders]
        : baseHeaders;
    },
    routeLabel() {
      switch (this.$route.path) {
        case '/processed': return 'Обработанные';
        case '/unprocessed': return 'Необработанные';
        default: return 'Все';
      }
    }
  },
  methods: {
    ...mapMutations('profiles', ['addProfile', 'updateProfile', 'deleteProfile']),
    ...mapActions('profiles', ['fetchProfiles']),
    refreshProfiles() {
      this.fetchProfiles();
    },
    openAddDialog() {
      this.resetForm();
      this.isEditing = false;
      this.dialog = true;
    },
    openEditDialog() {
      if (this.selected) {
        this.form = { ...this.selected };
        this.isEditing = true;
        this.dialog = true;
      }
    },
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    save() {
      if (this.isEditing) {
        this.updateProfile(this.form);
      } else {
        this.addProfile({
          ...this.form,
          id: Date.now(),
          status: 'unprocessed'
        });
      }
      this.dialog = false;
    },
    remove() {
      this.deleteProfile(this.selected.id);
      this.deleteDialog = false;
    },
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        company: '',
        position: '',
        phone: '',
        email: '',
        interests: ''
      };
    },
    getStatusIconComponent(status) {
      if (status === 'processed') {
        return {
          functional: true,
          render(h) {
            return h(SvgIcon, {
              props: { type: 'mdi', path: mdiCloudCheckVariant },
              style: { color: '#0F4C82' }
            });
          }
        };
      } else {
        return UnprocessedIcon;
      }
    },
    selectRow(row) {
      this.selected = this.selected && this.selected.id === row.id ? null : row;
    },
    getRowClass(item) {
      return this.selected && this.selected.id === item.id ? 'selected-row' : '';
    }
  },
  created() {
    this.fetchProfiles();
  }
}
</script>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 128px);
}

.v-data-table {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.v-data-table >>> .v-data-table__wrapper {
  flex: 1;
  overflow-y: auto;
}

.table-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
}

.table-label {
  font-weight: 500;
  font-size: 18px;
}

::v-deep(.selected-row) {
  background-color: #EDEDED !important;
}
</style>
