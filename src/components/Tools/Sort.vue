<template>
  <q-select
    outlined
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    label="Sort by"
    stack-label
    class="col-12 col-sm-4"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('tasks', ['sort']),
    sortBy: {
      get() {
        return this.sort
      },
      set(value) {
        this.setSort(value)
      }
    }
  },
  data() {
    return {
      options: [
        { label: 'Name', value: 'name' },
        { label: 'Date', value: 'dueDate' }
      ]
    }
  },
  methods: {
    ...mapActions('tasks', ['setSort'])
  }
}
</script>

<style scoped>
.q-select {
  /* flex: 0 0 200px; */
  /* params: first -> element shouldn't grow in width; second -> element shouldn't shrink in width; third -> sets base width of the element */
}
</style>
