<template lang="html">
  <div class="w-100 d-inline-flex justify-content-between align-items-center">
    <span class="title">
      {{data.title}}
    </span>
    <span class="points">
      {{data.points}}
    </span>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'quizitem',
  props: ['token', 'id'],
  data() {
    return {
      data: {}
    }
  },
  methods: {
    getQuizData() {
      axios.post('/api/quiz/get', {token: this.token, id: this.id}, {headers: {'Accept': 'application/json'}})
      .then((data)=>{
        if(data.data.success)
        this.data = data.data.quiz;
      });
    }
  },
  watch: {
    id: function() {
      this.getQuizData();
    }
  },
  created() {
    this.getQuizData();
  }
}
</script>

<style lang="css">
</style>
