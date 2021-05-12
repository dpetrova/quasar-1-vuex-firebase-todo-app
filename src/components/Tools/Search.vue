<template>
  <q-input
    outlined
    v-model="searchField"
    label="Search"
    class="col-12 col-sm-8"
    v-select-all
    @keyup.esc="searchField = ''"
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>

    <template v-slot:hint>
      Field hint
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { selectAll } from 'src/directives/directive-select-all' //import custom directive

export default {
  computed: {
    ...mapState('tasks', ['search']),
    searchField: {
      get() {
        return this.search
      },
      set(value) {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['setSearch'])
  },
  directives: {
    selectAll
  }
}
</script>

<style></style>
