<template>
  <div class="btn-group">
    <button v-for="b in templ" type="button" class="btn btn-secondary"
            :class="{active: active[b]}"
            @click="changeType('display')">display</button>

  </div>
</template>

<script>
export default {
  name: 'prop',
  props: {
    value: null,
    templ: null
  },
  components: {},
  computed: {
    active: function(){
      let obj = {};
      this.templ.forEach((el)=>{
        if(el == value){
          obj[el] = true;
        } else {
          obj[el] = false;
        }
      });
      return obj;
    }
  },
  beforeMount: function() {},
  mounted: function() {},
  methods: {
    handleInput: function(value) {
      this.$emit('input', value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.property {
  margin: 0.25em;
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
