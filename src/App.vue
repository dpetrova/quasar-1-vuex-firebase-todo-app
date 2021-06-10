<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  mounted() {
    //console.log(this.$q.platform)
    if (this.$q.platform.is.electron) {
      require('electron').ipcRenderer.on('show-settings', () => {
        this.$router.push('/settings')
      })
    }

    this.getSettings()
    this.handleAuthStateChange()
  },
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth', ['handleAuthStateChange'])
  }
}
</script>
