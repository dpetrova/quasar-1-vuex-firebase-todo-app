<template>
  <q-card>
    <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-card-section class="row">
        <div class="text-h6">Add Task</div>
        <q-space />
        <q-btn v-close-popup flat round dense icon="close" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="taskToSubmit.name"
          label="Name"
          class="col"
          :rules="[val => !!val || 'Field is required']"
          ref="name"
          autofocus
          clearable
        />

        <q-input
          outlined
          v-model="taskToSubmit.caption"
          label="Caption"
          class="col q-mb-md"
          clearable
        />

        <q-input
          outlined
          v-model="taskToSubmit.dueDate"
          label="Due date"
          class="col q-mb-md"
          clearable
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="taskToSubmit.dueDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          outlined
          v-model="taskToSubmit.dueTime"
          label="Due time"
          v-if="taskToSubmit.dueDate"
          clearable
        >
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="taskToSubmit.dueTime">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Save" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      taskToSubmit: {
        name: '',
        caption: '',
        dueDate: '',
        dueTime: '',
        completed: false
      }
    }
  },
  methods: {
    ...mapActions('tasks', ['addTask']),
    onSubmit() {
      console.log('submit')
      //no need this
      // this.$refs.name.validate()
      // if (!this.$refs.name.hasError) {
      //   //submit task
      // }
      this.addTask(this.taskToSubmit)
      this.$emit('close')
    },
    onReset() {}
  }
}
</script>

<style></style>
