<template>
  <div>
    <input id="description" v-model="inputText" />
    <p v-if="isTextBalanced">The text is balanced.</p>
    <p v-else>The text is not balanced.</p>
  </div>
</template>

<script>
  // using Options API in Vue3 so that Cypress can spy on isBalanced function call
  export default {
    data() {
      return {
        inputText: "",
        isTextBalanced: true,
        timeoutId: null // Add timeoutId to data
      }
    },
    methods: {
      isBalanced() {
        // Define the pairs of brackets to check for balance in the text
        const pairs = {
          ")": "(",
          "]": "[",
          "}": "{"
        }

        const openBrackets = new Set(Object.values(pairs))
        const stack = []

        // Iterate over each character in the input text to check for balance
        for (let char of this.inputText) {
          if (pairs[char]) {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
              this.isTextBalanced = false
              return
            }
          } else if (openBrackets.has(char)) {
            stack.push(char)
          }
        }

        this.isTextBalanced = stack.length === 0
      }
    },
    watch: {
      inputText: function () {
        clearTimeout(this.timeoutId) // Clear the previous timeout
        this.timeoutId = setTimeout(this.isBalanced, 50) // Set a new timeout
      }
    }
  }
</script>
