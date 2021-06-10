<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="absolute-center">Awesome Todo</q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />
        <q-btn
          v-else
          @click="logout"
          flat
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
      :breakpoint="767"
      :width="250"
    >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>

        <q-item
          v-for="nav in navs"
          :key="nav.label"
          clickable
          :to="nav.to"
          exact
          class="text-grey-5"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
            <q-item-label caption>{{ nav.caption }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="$q.platform.is.electron"
          clickable
          @click="quitApp"
          class="text-grey-5 absolute-bottom"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Quit</q-item-label>
            <q-item-label caption>Quit the application</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Layout',
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: 'Todo',
          icon: 'list',
          to: '/',
          caption: 'A things to do'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings',
          caption: 'Setup your space'
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    quitApp() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Really quit Awsome Todo?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          if (this.$q.platform.is.electron) {
            require('electron').ipcRenderer.send('quit-app')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
}
</style>
