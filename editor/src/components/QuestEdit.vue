<template>
<div id="questEdit">
  <h1 v-if="!questList">Загрузка...</h1>
  <div v-else class="container-fluid">
    <div class="row">
      <div class="col-2">
        <ItemList :list="questList" v-on:select="select"/>
      </div>
      <div class="col quest">
        <div class="buttons d-flex justify-content-end">
          <button type="button" name="button" class="btnSend btn btn-success" @click="send">Send</button>
        </div>
        <Properties v-if="selected" v-model="selected"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ItemList from './ItemList';
import Properties from './Properties.vue';
import axios from 'axios';

export default {
  name: 'questEdit',
  props: ['token'],
  components: {
    ItemList,
    Properties
  },
  methods: {
    select: function(id){
      this.questList = this.questList.map((el)=>{
        if(el._id == id){
          this.selected = el;
          console.log(el);
          return {...el, selected: true};
        }
        else return {...el, selected: false};
      });
    },
    getData: function(){
      axios.post('/api/quest/list', {token: this.token}, {headers: {'Accept': 'application/json'}})
      .then((data)=>{
        console.log(data.data);
        if(data.data.success)
        this.questList = data.data.quests;
      });
    },
    send: function(){
      let data = this.prettify();
      axios.post('/api/quest/edit', {token: this.token, data: data}, {headers: {'Accept': 'application/json'}})
      .then((data)=>{
        console.log(data.data);
        this.getData();
      });
    },
    prettify: function(){
      let data = this.selected;
      data.points = +data.points;
      if(!data._id) delete data._id;
      let stages = Object.keys(data.stages);
      stages.forEach((el)=>{
        let stage = data.stages[el];
        if(!stage.type){
          this.$delete(data.stages, el);
          return;
        } else if(stage.type == "display") {
          this.$delete(data.stages[el], 'quizId');
        } else if(stage.type == "quiz") {
          this.$delete(data.stages[el], 'text');
        }
      });
      delete data.selected;
      return data;
    }
  },
  data() {
    return {
      questList: undefined,
      selected: undefined
    }
  },
  created: function(){
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navigation {
  /*width: 100%;*/
  margin: 10px;
}
.btnSend {
  width: 8.3%;
}
#questEdit {
  /*overflow-y: hidden;*/
  margin-bottom: 1em;
}
.quest {
  /*overflow-x: auto;*/
}
</style>
