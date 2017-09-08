<template>
<div id="login" class="d-flex justify-content-center">
  <div class="loginContainer" @keyup.13="login">
    <div class="input-group">
      <span class="input-group-addon">Login</span>
      <input type="text" class="form-control" v-model="username"/>
    </div>
    <div class="input-group">
      <span class="input-group-addon">Password</span>
      <input type="text" class="form-control" v-model="password"/>
    </div>
    <button type="button" name="button" class="btn btn-outline-primary" @click="login">Войти</button>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'login',
  data: function(){
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login: function(){
      let data = {
        username: this.username,
        password: this.password
      }
      axios.post('/auth/signin', data, {
        headers: {'Accept': 'application/json'}
      }).then((data)=>{
        if(data.data.success)
        this.$emit('logged', data.data.token);
      });
    }
  }
}
</script>

<style>
#login {
  padding: 0.5em;
}
.loginContainer {
  width: 30%;
}
.loginContainer > div {
  margin-bottom: 0.5em;
}
</style>
