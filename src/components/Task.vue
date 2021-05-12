<template>
  <q-item
    v-ripple
    clickable
    v-touch-hold:1300.mouse="showEditTaskModal"
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="task.completed ? 'bg-green-1' : 'bg-orange-1'"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <!-- <q-item-label :class="{ 'text-strike': task.completed }">{{
        task.name
      }}</q-item-label> -->
      <q-item-label
        :class="{ 'text-strike': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
      ></q-item-label>
      <q-item-label caption>{{ task.caption }}</q-item-label>
    </q-item-section>

    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{
            task.dueDate | niceDate
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
          @click.stop="showEditTaskModal"
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
import { mapState, mapActions } from 'vuex'
import { date } from 'quasar'
const { formatDate } = date

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
  computed: {
    ...mapState('tasks', ['search'])
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
    },
    showEditTaskModal() {
      this.showEditTask = true
    }
  },
  components: {
    'edit-task': () => import('src/components/EditTask.vue')
  },
  filters: {
    niceDate(val) {
      return formatDate(val, 'MMM D')
    },
    searchHighlight(val, search) {
      if (search) {
        let searchRegex = new RegExp(search, 'ig') //pass case-insensitive and global flags
        return val.replace(searchRegex, match => {
          return `<span class="bg-yellow-6">${match}</span>`
        })
      }

      return val
    }
  }
}
</script>

<style lang="scss" scoped></style>
