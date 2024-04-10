<template>
  <div class="container w-96 mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Step: {{ headerMessage }}</h1>

    <div v-if="step === 1">
      <label for="username" class="block mb-2 text-sm font-medium">Username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p v-if="!isUsernameValid" class="text-red-500 text-xs mt-1">Invalid Username.</p>
    </div>

    <div v-if="step === 2">
      <label for="email" class="block mb-2 text-sm font-medium">Email:</label>
      <input
        type="text"
        id="email"
        v-model="email"
        class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p v-if="step === 2 && !isEmailValid" class="text-red-500 text-xs mt-1">Invalid email address.</p>
    </div>

    <div class="flex justify-between mt-4 mb-4 flex-wrap md:flex-nowrap">
      <button
        id="btn-prev"
        @click="prevStep"
        :disabled="step === 1"
        class="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md cursor-pointer disabled:opacity-50 disabled:bg-gray-200"
      >
        Prev
      </button>
      <button
        id="btn-next"
        :disabled="!isNextEnabled"
        @click="nextStep"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer disabled:opacity-50"
      >
        Next
      </button>
    </div>

    <div v-if="step === 3">
      <p class="px-4">Username: {{ username }}</p>
      <p class="px-4">Email: {{ email }}</p>
    </div>
  </div>
</template>
   
   <script>
   import { ref, computed } from 'vue';
   
   export default {
    setup() {
       const step = ref(1);
       const username = ref('');
       const email = ref('');
       const isUsernameValid = ref(true); // Assume valid until proven invalid
       const isEmailValid = ref(true); // Assume valid until proven invalid
   
       const headerMessage = computed(() => {
         switch (step.value) {
           case 1: return 'username';
           case 2: return 'email';
           case 3: return 'review';
           default: return '';
         }
       });
   
       const isNextEnabled = computed(() => {
         if (step.value === 3) return false
         return true;
       });
   
       function validateUsername() {
         const regex = /^[a-zA-Z0-9_]{4,20}$/;
         isUsernameValid.value = regex.test(username.value);
       }
   
       function validateEmail() {
         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         isEmailValid.value = regex.test(email.value);
       }
   
       function nextStep() {
         if (step.value === 1) {
           validateUsername();
           if (!isUsernameValid.value) return; // Stay on the current step if username is invalid
         }
         if (step.value === 2) {
           validateEmail();
           if (!isEmailValid.value) return; // Stay on the current step if email is invalid
         }
         step.value++;
       }
   
       function prevStep() {
         if (step.value > 1) step.value--;
       }
   
       return {
         step,
         username,
         email,
         headerMessage,
         isNextEnabled,
         validateUsername,
         validateEmail,
         nextStep,
         prevStep,
         isUsernameValid,
         isEmailValid,
       };
    },
   };
   </script>
   
   <style>
   .error {
    color: red;
   }
   </style>   