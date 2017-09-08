<template>
  <div id="app">
    <Navigation :isLogged="isLogged" :questSelected="questSelected" :quizSelected="quizSelected" :adminSelected="adminSelected"
    @questActive="toggleQuest" @quizActive="toggleQuiz" @adminActive="toggleAdmin"/>
    <Login v-if="!isLogged" v-on:logged="logged"/>
    <QuestEdit v-if="questSelected" :token="token"/>
    <QuizEdit v-if="quizSelected" :token="token"/>
    <Admin v-if="adminSelected" :token="token"/>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
import QuestEdit from './components/QuestEdit'
import QuizEdit from './components/QuizEdit'
import Admin from './components/Admin'
import Login from './components/Login'

export default {
  name: 'app',
  data: function(){
    return {
      isLogged: false,
      questSelected: false,
      quizSelected: false,
      adminSelected: false,
      token: undefined
    };
  },
  components: {
    Navigation,
    QuestEdit,
    Login,
    QuizEdit,
    Admin
  },
  methods: {
    logged: function(token) {
      this.token = token;
      this.isLogged = true;
      this.toggleQuest();
    },
    toggleAllOff: function() {
      this.questSelected = false;
      this.quizSelected = false;
      this.adminSelected = false;
    },
    toggleQuest: function() {
      this.toggleAllOff();
      this.questSelected = true;
    },
    toggleQuiz: function() {
      this.toggleAllOff();
      this.quizSelected = true;
    },
    toggleAdmin: function() {
      this.toggleAllOff();
      this.adminSelected = true;
    }
  }
}
</script>

<style>
#app {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
