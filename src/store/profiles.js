export default {
  namespaced: true,
  state: {
    profiles: []
  },
  mutations: {
    setProfiles(state, payload) {
      state.profiles = payload
    },
    addProfile(state, profile) {
      state.profiles.push(profile)
    },
    updateProfile(state, updated) {
      const index = state.profiles.findIndex(p => p.id === updated.id)
      if (index !== -1) state.profiles.splice(index, 1, updated)
    },
    deleteProfile(state, id) {
      state.profiles = state.profiles.filter(p => p.id !== id)
    }
  },
  actions: {
    fetchProfiles({ commit }) {
      const mock = [
        {
          id: 1,
          firstName: 'Marinna',
          lastName: 'Filon',
          company: 'Doist',
          position: 'COO',
          phone: '(555) 322-2894',
          email: 'gguerret3@flickr.com',
          interests: 'Table tennis',
          status: 'processed'
        },
        {
          id: 2,
          firstName: 'Marinna',
          lastName: 'Filon',
          company: 'Doist',
          position: 'COO',
          phone: '(555) 322-2894',
          email: 'gguerret3@flickr.com',
          interests: 'Table tennis',
          status: 'unprocessed'
        },
        {
          id: 3,
          firstName: 'Marinna',
          lastName: 'Filon',
          company: 'Doist',
          position: 'COO',
          phone: '(555) 322-2894',
          email: 'gguerret3@flickr.com',
          interests: 'Table tennis',
          status: 'processed'
        },
      ]
      commit('setProfiles', mock)
    }
  },
  getters: {
    all: state => state.profiles,
    processed: state => state.profiles.filter(p => p.status === 'processed'),
    unprocessed: state => state.profiles.filter(p => p.status === 'unprocessed')
  }
}
