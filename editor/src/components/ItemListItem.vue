<template>
<li class="list-group-item" @click="select" :class="{active: data.selected}">{{data.title}}</li>
</template>

<script>

export default {
  name: 'itemlistitem',
  props: ['data'],
  methods: {
    select: function(){
      this.$emit('select', this.data._id);
    }
  },
  data() {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>
