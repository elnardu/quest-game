<template>
  <div class="row about py-4" id="about">
    <div class="col-md-7">
      <h1 class="display-3">Hello, world!</h1>
      <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="col-md-5 d-flex justify-content-center align-items-center">
      <img src="../assets/screen1.png" class="rounded img-fluid" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about {
  background: white;
  max-width: 100%;
  padding-top: 4em;
  padding-bottom: 4em;  
}
h1 {
  font-family: Pixar;
}
</style>
