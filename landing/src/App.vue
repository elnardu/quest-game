<template>
  <div id="app">
    <Navigation></Navigation>
    <div class="content container-fluid">
      <hello/>
      <register/>
      <about/>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Navigation from './components/Nav'
import Register from './components/Register'
import About from './components/About'



export default {
  name: 'app',
  components: {
    Hello, Navigation, Register, About
  }
}
</script>

<style>
@font-face {
  font-family: Pixar;
  src: url('assets/Pixar_one_regular.ttf');
}
#app {
  /*width: 100vw;*/
  margin: 0;
}
.content {
  margin-top: 3em;
  /*width: 100%;*/
  /*padding: 0 !important;*/
}
</style>
