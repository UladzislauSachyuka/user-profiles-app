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
              <v-btn class="text-none" color="primary" dark v-bind="attrs" v-on="on">
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

    <ProfileSearchDrawer
      v-model="searchDrawer"
      :filters="appliedFilters"
      @apply="handleApply"
      @clear="clearSearch"
    />

    <ProfileFormDialog
      v-model="dialog"
      :is-editing="isEditing"
      :selected-profile="selected"
      @save="save"
    />

    <DeleteProfileDialog
      v-model="deleteDialog"
      :selected-profile="selected"
      @confirm-delete="remove"
    />
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCloudCheckVariant, mdiRefresh } from '@mdi/js';
import UnprocessedIcon from '@/components/UnprocessedIcon.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import ProfileSearchDrawer from '@/components/ProfileSearchDrawer.vue';
import ProfileFormDialog from '@/components/ProfileFormDialog.vue';
import DeleteProfileDialog from '@/components/DeleteProfileDialog.vue';
import { EMPTY_FILTERS } from '@/constants';

export default {
  props: ['profiles'],
  components: {
    SvgIcon,
    UnprocessedIcon,
    ProfileSearchDrawer,
    ProfileFormDialog,
    DeleteProfileDialog
  },
  data() {
    return {
      mdiRefresh,
      selected: null,
      dialog: false,
      deleteDialog: false,
      isEditing: false,
      searchDrawer: false,
      appliedFilters: { ...EMPTY_FILTERS }
    }
  },
  computed: {
    ...mapGetters('profiles', ['all', 'processed', 'unprocessed']),
    filteredProfiles() {
      let baseList;

      switch (this.$route.path) {
        case '/processed': baseList = this.processed; break;
        case '/unprocessed': baseList = this.unprocessed; break;
        default: baseList = this.all;
      }

      return baseList.filter(profile => {
        return Object.entries(this.appliedFilters).every(([key, value]) => {
          if (!value) return true;
          return String(profile[key] || '').toLowerCase().includes(value.toLowerCase());
        });
      });
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
      this.isEditing = false;
      this.selected = null;
      this.dialog = true;
    },
    openEditDialog() {
      if (!this.selected) return;
      this.isEditing = true;
      this.dialog = true;
    },
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    save(profileData) {
      if (this.isEditing) {
        this.updateProfile(profileData);
      } else {
        this.addProfile({
          ...profileData,
          id: Date.now(),
          status: 'unprocessed'
        });
      }
      this.dialog = false;
    },
    remove(profileId) {
      this.deleteProfile(profileId);
      this.deleteDialog = false;
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
    },
    toggleSearchDrawer() {
      this.searchDrawer = !this.searchDrawer;
    },
    handleApply(newFilters) {
      this.appliedFilters = { ...newFilters };
    },
    clearSearch() {
      this.appliedFilters = { ...EMPTY_FILTERS  };
    }
  },
  created() {
    this.fetchProfiles();
    this.$root.$on('toggle-search', this.toggleSearchDrawer);
  },
  beforeDestroy() {
    this.$root.$off('toggle-search', this.toggleSearchDrawer);
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

::v-deep(.v-btn) {
  font-family: 'Roboto', sans-serif !important;
  letter-spacing: normal !important;
}

</style>
