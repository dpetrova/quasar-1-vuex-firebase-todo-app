<template>
  <q-item
    v-ripple
    clickable
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="task.completed ? 'bg-green-1' : 'bg-orange-1'"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{ 'text-strike': task.completed }">{{
        task.name
      }}</q-item-label>
      <q-item-label caption>{{ task.caption }}</q-item-label>
    </q-item-section>

    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{
            task.dueDate
          }}</q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="edit"
          @click.stop="showEditTask = true"
        />
        <q-btn
          flat
          round
          dense
          color="negative"
          icon="delete"
          @click.stop="promptToDelete(id)"
        />
      </div>
    </q-item-section>

    <!-- dialog to edit an item -->
    <q-dialog v-model="showEditTask">
      <edit-task
        :task="task"
        :id="id"
        @close="showEditTask = false"
      ></edit-task>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Task',
  props: {
    task: Object,
    id: String
  },
  data() {
    return {
      showEditTask: false
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Really delete?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id)
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
    }
  },
  components: {
    'edit-task': () => import('src/components/EditTask.vue')
  }
}
</script>

<style lang="scss" scoped></style>
