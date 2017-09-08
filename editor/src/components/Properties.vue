<template>
<div class="properties">
  <Property v-for="key in keys" :pkey="key" v-model="value[key]"/>
  <Stage v-for="stage in stages" :num="stage" v-model="value.stages[stage]"/>
  <div class="buttons d-flex justify-content-start">
    <div class="btn-group">
      <button type="button" name="button" class="btnFooter btn btn-success" @click="addStage">+</button>
      <button type="button" name="button" class="btnFooter btn btn-danger" @click="removeStage">-</button>
    </div>
  </div>
</div>
</template>

<script>
import Property from './Property.vue';
import Stage from './Stage.vue';


export default {
  name: 'properties',
  props: ['value'],
  components: {
    Property,
    Stage
  },
  computed: {
    stages: function() {
      return Object.keys(this.value.stages);
    },
    keys: function() {
      let keys = Object.keys(this.value);
      keys = keys.filter((el)=>{
        if(el=='selected' || el=='stages') return false;
        else return true;
      });
      return keys;
    }
  },
  methods: {
    addStage: function() {
      let newStage = {};
      let num = this.stages.length;
      this.$set(this.value.stages, ++num, {
        type: null,
        text: null,
        quizId: null
      })
    },
    removeStage: function() {
      let num = this.stages.length;
      this.$delete(this.value.stages, num);
    }
  }
}
</script>

<style scoped>
.properties {
  /*border-left: solid 1px #0275d8;*/
}
.buttons {
  padding: 0;
  margin-top: 0.5em;
  transform: translateX(-15px);
}
.btn-group {
  width: 8.33%;
}
.btnFooter {
  width: 100%;
  font-weight: bold;
}
</style>
