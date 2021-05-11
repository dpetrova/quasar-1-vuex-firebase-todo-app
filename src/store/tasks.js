import Vue from 'vue'
import { uid } from 'quasar' //generate unique identifiers

const state = {
  /*  
  tasks: [
    {
      id: 1,
      name: 'Get early',
      caption: 'Do not forget to set up alarm',
      dueDate: '2021/07/14',
      dueTime: '06:30',
      completed: false
    },
    {
      id: 2,
      name: 'Drink coffee',
      caption: 'Strong, withot sugar',
      dueDate: '2021/07/14',
      dueTime: '07:30',
      completed: false
    },
    {
      id: 3,
      name: 'Write something useful',
      caption: 'Do not waste your time',
      dueDate: '2021/07/14',
      dueTime: '22:00',
      completed: false
    }
  ]
  */

  //firebase not using arrays but only objects
  tasks: {
    ID1: {
      name: 'Get early',
      caption: 'Do not forget to set up alarm',
      dueDate: '2021/07/14',
      dueTime: '06:30',
      completed: true
    },
    ID2: {
      name: 'Drink coffee',
      caption: 'Strong, withot sugar',
      dueDate: '2021/07/14',
      dueTime: '07:30',
      completed: false
    },
    ID3: {
      name: 'Write something useful',
      caption: 'Do not waste your time',
      dueDate: '2021/07/14',
      dueTime: '22:00',
      completed: false
    }
  }
}

const mutations = {
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task) //when add new object to the state, we need to use Vue.set(), to ensure the data remains reactive
  },
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id) //delete a keyed object from the state
  }
}

const actions = {
  addTask({ commit }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  },
  updateTask({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id)
  }
}

const getters = {
  tasksTodo: state => {
    let tasks = {}
    for (const key in state.tasks) {
      const task = state.tasks[key]
      if (!task.completed) {
        tasks[key] = task
      }
    }
    return tasks
  },
  tasksCompleted: state => {
    let tasks = {}
    for (const key in state.tasks) {
      const task = state.tasks[key]
      if (task.completed) {
        tasks[key] = task
      }
    }
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
