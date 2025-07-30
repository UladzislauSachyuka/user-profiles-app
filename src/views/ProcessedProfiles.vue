<template>
  <DefaultLayout>
    <v-container>
      <ProfileTable :profiles="processed" @refresh="load" />
    </v-container>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProfileTable from '@/components/ProfileTable.vue'
import { mapGetters } from 'vuex'

export default {
  components: { DefaultLayout, ProfileTable },
  computed: {
    ...mapGetters('profiles', ['processed'])
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.$store.dispatch('profiles/fetchProfiles')
    }
  }
}
</script>
