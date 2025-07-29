<template>
  <div class="table-container">
    <v-data-table
      :headers="computedHeaders"
      :items="profiles"
      item-key="id"
      class="elevation-1 fill-height"
      :footer-props="{
        'items-per-page-options': [5, 10, 20, -1]
      }"
    >
      <template v-slot:top>
        <div class="table-header">
          <span class="table-label">{{ routeLabel }}</span>
          <v-btn icon @click="$emit('refresh')" >
            <svg-icon type="mdi" :path="mdiRefresh" />
          </v-btn>
        </div>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <component
          v-if="showStatusColumn"
          :is="getStatusIconComponent(item.status)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCloudCheckVariant, mdiRefresh } from '@mdi/js';
import UnprocessedIcon from '@/components/UnprocessedIcon.vue';

export default {
  props: ['profiles'],
  components: {
    SvgIcon,
    UnprocessedIcon
  },
  data() {
    return {
      mdiRefresh
    }
  },
  computed: {
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
        case '/processed':
          return 'Обработанные'
        case '/unprocessed':
          return 'Необработанные'
        default:
          return 'Все'
      }
    }
  },
  methods: {
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
    }
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
</style>
