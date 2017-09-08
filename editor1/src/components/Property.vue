<template>
<div class="row property">
  <div class="col-1 key bg-primary text-white rounded">
      {{pkey}}
  </div>
  <div class="col">
    <textarea :value="value" @input="handleInput($event.target.value)" class="value form-control" :rows="rows"/>
  </div>
</div>
</template>

<script>
import Properties from './Properties.vue';
import TextInput from './TextInput.vue';
export default {
  name: 'property',
  props: {
    pkey: null,
    value: null,
    rows: {
      required: false,
      default: 1
    }
  },
  components: {
    TextInput
  },
  computed: {
    isNum: function(){
      return Number.isInteger(this.value);
    }
  },

  beforeMount: function(){
  },
  mounted: function(){
  },
  methods: {
    handleInput: function(value) {
      let formatted = value.trim();
      if(this.isNum){
        formatted = +formatted;
      }
      this.$emit('input', formatted);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.property {
  margin-top: 0.5em;
}
.key {
  /*text-align: right;*/
  padding: 5px;
  /*border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;*/
}
.value {
  /*text-align: left;*/
}
</style>
