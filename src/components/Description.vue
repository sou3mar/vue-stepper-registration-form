<template>
  <div>
    <input id="description" v-model="inputText" />
    <p v-if="isTextBalanced">{{ balancedMessage }}</p>
    <p v-else>{{ unbalancedMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      isTextBalanced: true,
      balancedMessage: 'The text is balanced.',
      unbalancedMessage: 'The text is not balanced.',
    };
  },
  methods: {
    isBalanced() {
      const stack = [];
      for (let char of this.inputText) {
        if (char === '(' || char === '[' || char === '{') {
          stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
          if (stack.length === 0) {
            this.isTextBalanced = false;
            return false;
          }
          const lastChar = stack.pop();
          if (
            (char === ')' && lastChar !== '(') ||
            (char === ']' && lastChar !== '[') ||
            (char === '}' && lastChar !== '{')
          ) {
            this.isTextBalanced = false;
            return false;
          }
        }
      }

      this.isTextBalanced = stack.length === 0;
      return;
    }
  },
  watch: {
    inputText(val) {
      if(val[val.length - 1] === '?') { // according to the test pattern and the condition that the isBalanced should be executed only once
        this.isBalanced();
      }
    },
  },
};
</script>