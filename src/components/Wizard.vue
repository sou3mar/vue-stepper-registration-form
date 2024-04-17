<template>
  <div class="container w-96 mx-auto px-4 py-8">
    <h1 v-if="currentStep" class="text-2xl font-bold mb-4">Step: {{ currentStep.label }}</h1>

    <div v-if="state.step < steps.length">
      <label :for="currentStep.model" class="block mb-2 text-sm font-medium">{{ currentStep.label }}:</label>
      <input
        :type="currentStep.type"
        :id="currentStep.model"
        v-model="state[currentStep.model]"
        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" />
      <p v-if="!state[currentStep.valid]" class="text-red-500 text-xs mt-1">
        {{ currentStep.errorMessage }}
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
        :disabled="state.step === steps.length"
        @click="nextStep"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer disabled:opacity-50">
        Next
      </button>
    </div>

    <div v-if="state.step === steps.length">
      <p class="px-4">Username: {{ state.username }}</p>
      <p class="px-4">Email: {{ state.email }}</p>
    </div>
  </div>
</template>

<script>
  import { reactive, computed } from "vue"

  // Define the steps of the wizard form
  const steps = [
    {
      label: "Username",
      model: "username",
      type: "text",
      valid: "isUsernameValid",
      validator: value => /^[a-zA-Z0-9_]{4,20}$/.test(value),
      errorMessage: "Invalid Username."
    },
    {
      label: "Email",
      model: "email",
      type: "text",
      valid: "isEmailValid",
      validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMessage: "Invalid email address."
    },
    {
      // last step is set to be the review step
      // no input fields, just a review of the previous steps
      label: "review"
    }
  ]

  export default {
    setup() {
      const state = reactive({
        step: 1,
        username: "",
        email: "",
        isUsernameValid: true,
        isEmailValid: true
      })

      const currentStep = computed(() => steps[state.step - 1])

      const nextStep = () => {
        if (state.step <= steps.length) {
          const isValid = currentStep.value.validator(state[currentStep.value.model])
          state[currentStep.value.valid] = isValid
          if (!isValid) return
        }
        state.step++
      }

      const prevStep = () => {
        if (state.step > 1) state.step--
      }

      return {
        state,
        steps,
        currentStep,
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
