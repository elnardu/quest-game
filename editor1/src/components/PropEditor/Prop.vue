<template>
<div class="row property">
  <div class="col-1 key bg-primary text-white rounded">
    {{pkey}}
  </div>
  <div class="col">
    <textarea v-if="isString" v-model="value" class="value form-control" rows="1" />
    <textarea v-if="isNumber" v-model="value" class="value form-control" rows="1" />

    <prop v-if="isObj" v-for="p in Object.keys(templ)" :pkey="p" v-model="value[p]" :templ="templ[p]" />
  </div>



</div>
</template>

<script>
export default {
  name: 'prop',
  props: {
    pkey: null,
    value: null,
    templ: null
  },
  components: {},
  computed: {
    isString: function() {
      return this.templ == "string";
    },
    isNumber: function() {
      return this.templ == "number";
    },
    isChoice: function() {
      return Array.isArray(this.templ);
    },
    isObj: function() {
      return typeof this.templ === "object";
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
