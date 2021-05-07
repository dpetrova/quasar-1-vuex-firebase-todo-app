<template>
  <q-page class="q-pa-md">
    <!-- tasks list -->
    <q-list bordered separator v-if="Object.keys(tasks).length">
      <task
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :id="key"
      ></task>
    </q-list>

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
    ...mapGetters('tasks', ['tasks'])
  },
  components: {
    //task: require('src/components/Task.vue').default
    task: () => import('src/components/Task.vue'),
    'add-task': () => import('src/components/AddTask.vue')
  }
}
</script>

<style lang="scss" scoped></style>
