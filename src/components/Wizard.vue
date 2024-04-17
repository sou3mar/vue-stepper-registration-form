<template>
  <div class="container w-96 mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Step: {{ headerMessage }}</h1>

    <div v-if="state.step <= 2">
      <label :for="currentField.id" class="block mb-2 text-sm font-medium">{{ currentField.label }}:</label>
      <input
        :type="currentField.type"
        :id="currentField.model"
        v-model="state[currentField.model]"
        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
      <p v-if="!state[currentField.valid]" class="text-red-500 text-xs mt-1">
        {{ currentField.errorMessage }}
      </p>
    </div>

    <div class="flex justify-between mt-4 mb-4 flex-wrap md:flex-nowrap">
      <button
        id="btn-prev"
        @click="prevStep"
        :disabled="state.step === 1"
        class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md cursor-pointer disabled:opacity-50 disabled:bg-gray-200">
        Prev
      </button>
      <button
        id="btn-next"
        :disabled="!isNextEnabled"
        @click="nextStep"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer disabled:opacity-50">
        Next
      </button>
    </div>

    <div v-if="state.step === 3">
      <p class="px-4">Username: {{ state.username }}</p>
      <p class="px-4">Email: {{ state.email }}</p>
    </div>
  </div>
</template>

<script>
  import { reactive, computed } from "vue"

  export default {
    setup() {
      const state = reactive({
        step: 1,
        username: "",
        email: "",
        isUsernameValid: true,
        isEmailValid: true
      })

      const headerMessage = computed(() => {
        switch (state.step) {
          case 1:
            return "username"
          case 2:
            return "email"
          case 3:
            return "review"
          default:
            return ""
        }
      })

      const isNextEnabled = computed(() => {
        if (state.step === 3) return false
        return true
      })

      const currentField = computed(() => {
        switch (state.step) {
          case 1:
            return {
              type: "text",
              label: "Username",
              model: "username",
              valid: "isUsernameValid",
              errorMessage: "Invalid Username."
            }
          case 2:
            return {
              type: "text",
              label: "Email",
              model: "email",
              valid: "isEmailValid",
              errorMessage: "Invalid email address."
            }
          default:
            return {}
        }
      })

      const validateUsername = () => {
        const regex = /^[a-zA-Z0-9_]{4,20}$/
        state.isUsernameValid = regex.test(state.username)
      }

      const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        state.isEmailValid = regex.test(state.email)
      }

      const nextStep = () => {
        if (state.step === 1) {
          validateUsername()
          if (!state.isUsernameValid) return
        }
        if (state.step === 2) {
          validateEmail()
          if (!state.isEmailValid) return
        }
        state.step++
      }

      const prevStep = () => {
        if (state.step > 1) state.step--
      }

      return {
        state,
        headerMessage,
        isNextEnabled,
        currentField,
        validateUsername,
        validateEmail,
        nextStep,
        prevStep
      }
    }
  }
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
