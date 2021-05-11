<template>
  <q-page class="q-pa-md">
    <!-- no tasks banner -->
    <no-tasks v-if="!Object.keys(tasksTodo).length"></no-tasks>

    <!-- todo tasks list -->
    <tasks-list
      v-else
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

    <!-- button to add a new task -->
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTask = true"
        round
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <!-- dialog to add a new item -->
    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false"></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted'])
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
    'no-tasks': () => import('src/components/NoTasks.vue')
  }
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
