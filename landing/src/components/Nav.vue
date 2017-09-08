<template>
  <div class="header d-flex flex-row justify-content-between align-items-center">
    <h1 class="name ml-5">ROK</h1>
    <div class="buttons mr-3">
      <a href="/app/login" class="btn btn-secondary">Войти</a>
      <a href="#" class="btn btn-secondary">О проекте</a>
      <a href="#register" class="btn btn-secondary">Регистрация</a>
      <a href="#about" class="btn btn-secondary">О нас</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navigation',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3em;
  background: #2ecc71;
  z-index: 100;
  /*background: url('../assets/bg.png');*/
}
.name {
  font-family: Pixar;
  color: white;
  -webkit-font-smoothing : none;
}
</style>
