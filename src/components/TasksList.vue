<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header :color="color" v-if="!settings.showTasksInOneList">{{
        title
      }}</list-header>
      <q-list bordered separator>
        <task
          v-for="(task, key) in tasks"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TasksList',
  props: {
    tasks: Object,
    title: String,
    color: String
  },
  computed: {
    ...mapGetters('settings', ['settings'])
  },
  mounted() {
    //listen to global bus event
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    //task: require('src/components/Task.vue').default
    task: () => import('src/components/Task.vue'),
    'list-header': () => import('src/components/Shared/ListHeader.vue')
  }
}
</script>

<style lang="scss" scoped>
.list-header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
