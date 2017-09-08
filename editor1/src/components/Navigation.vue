<template>
<ul class="nav navigation nav-pills justify-content-center">
  <li class="nav-item" v-show="!isLogged">
    <a class="nav-link active" href="#">Войти</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :class="{disabled: !isLogged, active: questSelected}" @click="chooseQuest" href="#">Quest</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :class="{disabled: !isLogged, active: quizSelected}" @click="chooseQuiz" href="#">Quiz</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" :class="{disabled: !isLogged, active: adminSelected}" @click="chooseAdmin" href="#">Admin</a>
  </li>
</ul>
</template>

<script>
export default {
  name: 'navigation',
  props: ['isLogged', 'questSelected', 'quizSelected', 'adminSelected'],
  methods: {
    chooseQuest: function(){
      this.$emit('questActive');
    },
    chooseQuiz: function(){
      this.$emit('quizActive');
    },
    chooseAdmin: function(){
      this.$emit('adminActive');
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
  border-bottom: solid 1px #0275d8;
  padding-bottom: 5px;
}
</style>
