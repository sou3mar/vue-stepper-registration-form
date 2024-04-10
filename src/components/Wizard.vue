<template>
    <div>
       <h1>Step: {{ headerMessage }}</h1>
       <div v-if="step === 1">
        <label for="username">Username: </label>
        <input  type="text" id="username" v-model="username" />
        <p v-if="!isUsernameValid" class="error">Invalid Username.</p>
       </div>

       <div v-if="step === 2">
        <label for="email">Email: </label>
        <input v-if="step === 2" type="text" id="email" v-model="email" />
        <p v-if="step === 2 && !isEmailValid" class="error">Invalid email address.</p>
       </div>

       <div>
        <button id="btn-prev" @click="prevStep" :disabled="step == 1">Prev</button>
        <button id="btn-next" :disabled="!isNextEnabled" @click="nextStep">Next</button>
       </div>

       <div v-if="step === 3">
        <p>Username: {{ username }}</p>
        <p>Email: {{ email }}</p>
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