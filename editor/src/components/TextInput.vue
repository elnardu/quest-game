<template>
<textarea v-else v-model="text" class="value form-control" rows="1"/>
</template>

<script>
export default {
  name: 'TextInput',
  props: ['value'],
  methods: {

  },
  computed: {
    text: function(){
      return this.value;
    }
  },
  watch: {
    text: function(){
      // this.$emit('textChange', text);
    }
  },
  data: function(){
    return {
    };
  },
  beforeUpdate: function(){

  },
  created: function(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.value {
  /*text-align: left;*/
}
</style>
