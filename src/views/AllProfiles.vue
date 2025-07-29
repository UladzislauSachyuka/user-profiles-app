<template>
  <DefaultLayout>
    <v-container>
      <ProfileTable :profiles="all" @refresh="load" />
    </v-container>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProfileTable from '@/components/ProfileTable.vue'
import { mapState } from 'vuex'

export default {
  components: { DefaultLayout, ProfileTable },
  computed: {
    ...mapState('profiles', ['profiles']),
    all() {
      return this.profiles
    }
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
