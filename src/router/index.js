import Vue from 'vue'
import Router from 'vue-router'
import AllProfiles from '../views/AllProfiles.vue'
import ProcessedProfiles from '../views/ProcessedProfiles.vue'
import UnprocessedProfiles from '../views/UnprocessedProfiles.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AllProfiles',
      component: AllProfiles
    },
    {
      path: '/processed',
      name: 'ProcessedProfiles',
      component: ProcessedProfiles
    },
    {
      path: '/unprocessed',
      name: 'UnprocessedProfiles',
      component: UnprocessedProfiles
    }
  ]
})
