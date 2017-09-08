<template lang="html">
  <li class="list-group-item" :class="{active: user.selected}" @click="select">
    {{user._id}}
    <span :class="{active: user.selected}" >{{user.points}}</span>
  </li>
</template>

<script>
export default {
  name: 'useritem',
  props: ['user'],
  methods: {
    select() {
      this.$emit('selectUser', this.user._id);
    }
  }
}
</script>

<style lang="css" scoped>
span {
  color: #2ecc71;
  text-align: right;
  margin-left: auto;
}
span + .active {
  color: white;
}
li {
  cursor: pointer;
}
</style>
