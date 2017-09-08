<template lang="html">
<div>
  <button type="button" name="button" class="updateTopUsers btn btn-outline-success btn-block" @click="getUserData">Обновить</button>
  <div class="card">
    <div class="card-block">
      <div class="d-flex flex-row justify-content-between align-items-center">
        <h2>{{userdata.username}}</h2>
        <span class="points">{{userdata.points}}</span>
      </div>
      <div v-if="userdata.complitedQuizzes && userdata.complitedQuizzes.length != 0">
        <h3>Выполнено:</h3>
        <ul>
          <li v-for="quiz in userdata.complitedQuizzes">
            <QuizItem :token="token" :id="quiz"/>
          </li>
        </ul>
      </div>
      <p v-else>Этот пользователь еще не выполнил никаких заданий</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import QuizItem from './QuizItem'


export default {
  name: 'userdisplay',
  props: ['username', 'token'],
  components: {
    QuizItem
  },
  data: function() {
    return {
      userdata: {}
    }
  },
  methods: {
    getUserData() {
      axios.post('/api/user/getByName', {token: this.token, username: this.username}, {headers: {'Accept': 'application/json'}})
      .then((data)=>{
        console.log(data);
        if(data.data.success)
        this.userdata = data.data.data;
      });
    }
  },
  watch: {
    username: function() {
      this.getUserData();
    }
  }
}
</script>

<style lang="css" scoped>
.card {
  margin-top: 0.5em;
}
.points {
  color: #2ecc71;
  font-size: 2em;
}
h3 {
  text-align: left;
  margin-top: 1em;
}
</style>
