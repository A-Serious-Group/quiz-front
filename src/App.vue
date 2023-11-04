<template>
  <router-view/>
  <!-- <SideBar/> -->

  <footer style="text-align: right;" class="footer mr-2 mb-1">
    Todos os Direitos reservados <i class="bi bi-c-circle"></i> A Serious Group - {{ year }}
  </footer>
  
</template>

<script>
// import SideBar from './components/SideBar.vue';


export default {
  components: {
    // SideBar
  },
  computed: {
    year() {
      const date = new Date();
      return date.getFullYear();
    }
  }
}

</script>

<style>
  #app{
    font-family: Arial, sans-serif
  }
  .footer {
    position: fixed;
    bottom: 0;
    right: 0;
    text-align: right;
    font-family: 'OwnWritten', sans-serif;
    font-size: 25px;
  }

  @font-face {
    font-family: 'OwnWritten';
    src: url('./assets/ownWritten.ttf') format('truetype');
  }

  .custom-font {
    font-family: 'Blueberry ';
    src: url('./assets/Blueberry .ttf') format('truetype');
    font-size: 30px
  }

  .fontt {
    font-family: 'OwnWritten', sans-serif;
    font-weight: 400
  }

  /* @import '~bootstrap/dist/css/bootstrap.css'; */

  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
</style>