<template>
  <div class="row d-flex justify-content-center align-items-center block" id="register">
    <form class="form col-md-3 rounded py-3" >
      <div class="form-group">
        <label for="username">Ник</label>
        <input type="text" class="form-control" id="username" placeholder="Ник">
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" class="form-control" id="email" placeholder="E-mail">
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" class="form-control" id="password" placeholder="Пароль">
      </div>
      <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'register',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  margin-top: 1em;
  background-color: #bdc3c7;
  padding-top: 4em;
  padding-bottom: 4em;  
}
.form {
  background-color: white;
}
</style>
