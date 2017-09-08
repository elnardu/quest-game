<template>
<div id="questEdit">
  <h1 v-if="!quizList">Загрузка...</h1>
  <div v-else class="container-fluid">
    <div class="row">
      <div class="col-2">
        <ItemList :list="quizList" v-on:select="select"/>
      </div>
      <div class="col quest">
        <div class="buttons d-flex justify-content-end">
          <button type="button" name="button" class="btnSend btn btn-success" @click="send">Send</button>
        </div>
        <Property v-if="selected" v-model="selected" pkey="root" :templ="templ"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ItemList from './ItemList';
import Property from './PropEditor/Prop.vue';
import axios from 'axios';

let templ = {
  _id: "string",
  title: "string",
  type: "string",
  text: "string",
  question: {
    "1": "string",
    "2": "string",
    "3": "string",
    "4": "string",
    "answer": "number"
  }
}

export default {
  name: 'quizedit',
  props: ['token'],
  components: {
    ItemList,
    Property
  },
  methods: {
    select: function(id){
      this.quizList = this.quizList.map((el)=>{
        if(el._id == id){
          this.selected = el;
          console.log(el);
          return {...el, selected: true};
        }
        else return {...el, selected: false};
      });
    },
    getData: function(){
      axios.post('/api/quiz/list', {token: this.token}, {headers: {'Accept': 'application/json'}})
      .then((data)=>{
        console.log(data.data);
        if(data.data.success)
        this.quizList = data.data.quizzes;
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

  },
  data() {
    return {
      quizList: undefined,
      selected: undefined,
      templ: templ
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
