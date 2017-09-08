<template>
<ul class="list-group">
  <ItemListItem v-for="item in list" :data="item" @select="select"/>
</ul>
</template>

<script>
import ItemListItem from './ItemListItem';

export default {
  name: 'itemlist',
  props: ['list'],
  components: {
    ItemListItem
  },
  methods: {
    select: function(id){
      this.$emit('select', id);
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
.navigation {
  /*width: 100%;*/
  margin: 10px;
}
</style>
