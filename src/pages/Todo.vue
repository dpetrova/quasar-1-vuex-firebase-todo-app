<template>
  <q-page>
    <div class="q-pa-md absolute full-width full-height column">
      <template v-if="tasksDownloaded">
        <!-- search bar -->
        <div class="row q-col-gutter-xs q-mb-sm">
          <search />
          <sort />
        </div>

        <q-scroll-area class="q-tasks-scroll-area">
          <!-- no tasks banner -->
          <no-tasks v-if="!Object.keys(tasksTodo).length && !search">
            No tasks to do.</no-tasks
          >

          <!-- no search results banner -->
          <no-tasks
            v-if="
              search &&
                !Object.keys(tasksTodo).length &&
                !Object.keys(tasksCompleted).length
            "
          >
            No results matched.</no-tasks
          >

          <!-- todo tasks list -->
          <tasks-list
            v-if="Object.keys(tasksTodo).length"
            :tasks="tasksTodo"
            title="Todo"
            color="bg-orange-4"
          ></tasks-list>

          <!-- completed tasks list -->
          <tasks-list
            v-if="Object.keys(tasksCompleted).length"
            :tasks="tasksCompleted"
            title="Completed"
            color="bg-green-4"
          ></tasks-list>
        </q-scroll-area>

        <!-- button to add a new task -->
        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            @click="showAddTask = true"
            round
            color="primary"
            size="24px"
            icon="add"
            class="all-pointer-events"
          />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner color="primary" size="3em" />
        </span>
      </template>
    </div>

    <!-- dialog to add a new item -->
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false"></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Todo',
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    // tasks() {
    //   return this.$store.getters['tasks/tasks']
    // }
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapState('tasks', ['search', 'tasksDownloaded'])
  },
  mounted() {
    //listen to global bus event
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    'add-task': () => import('src/components/AddTask.vue'),
    'tasks-list': () => import('src/components/TasksList.vue'),
    'no-tasks': () => import('src/components/NoTasks.vue'),
    search: () => import('src/components/Tools/Search.vue'),
    sort: () => import('src/components/Tools/Sort.vue')
  }
}
</script>

<style lang="scss" scoped>
.q-tasks-scroll-area {
  display: flex;
  flex-grow: 1;
  .scroll {
    height: auto !important;
  }
  //fix tasks scroll area in older iOS devices
  .mobile & {
    //& refers to parent css property (here it will match: .mobile.q-tasks-scroll-area)
    flex-basis: 100px;
  }
}
</style>
