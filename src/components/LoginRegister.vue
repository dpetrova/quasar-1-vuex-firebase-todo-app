<template>
  <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="account_circle" color="primary" />
      </template>
      {{ mode | sentenseCase }} to access your todos enywhere
    </q-banner>
    <q-input
      outlined
      v-model="formData.email"
      label="Email *"
      hint="Enter your email"
      lazy-rules
      :rules="[val => isValidEmail(val) || 'Please enter a valid email']"
    />

    <q-input
      outlined
      v-model="formData.password"
      type="password"
      label="Password *"
      hint="Create a password"
      lazy-rules
      :rules="[
        val =>
          (val && val.length >= 6) || 'Password must be at least 6 characters'
      ]"
    />

    <q-toggle
      v-if="mode === 'register'"
      v-model="accept"
      label="I accept the license and terms"
    />

    <div class="row">
      <q-space />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      <q-btn :label="mode" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
export default {
  props: {
    mode: String
  },
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      accept: false
    }
  },
  methods: {
    isValidEmail(email) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(String(email).toLowerCase())
    },
    onSubmit() {
      console.log('submit')
      if (this.mode === 'login') {
        console.log('login')
      } else {
        console.log('register')
      }
    },
    onReset() {
      console.log('reset')
    }
  },
  filters: {
    sentenseCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style></style>
