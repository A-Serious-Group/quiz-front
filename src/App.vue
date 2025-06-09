<template>
  <NavBar/>
  <router-view/>

  <!-- <footer style="text-align: right;" class="footer mr-2 mb-1">
    Todos os Direitos reservados <i class="bi bi-c-circle"></i> A Serious Group - {{ year }}
  </footer> -->
  
</template>

<script>
import NavBar from './components/NavBar.vue';


export default {
  components: {
    NavBar
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
    font-family: 'Berlin Sans FB', sans-serif
  }
  .footer {
    position: fixed;
    bottom: 0;
    right: 0;
    text-align: right;
    font-family: 'Berlin Sans FB', sans-serif;
    font-size: 25px;
  }

  @font-face {
    font-family: 'Berlin Sans FB';
    src: url('./assets/BRLNSR.TTF') format('truetype');
  }

  .custom-font {
    font-family: 'Berlin Sans FB ';
    src: url('./assets/BRLNSR.TTF') format('truetype');
    font-size: 30px
  }

  .fontt {
    font-family: "Berlin Sans FB", "Montserrat", Helvetica, Arial, sans-serif !important;
    font-weight: 400
  }

  .primary-quiz {
    color:#8a2253;
  }

  /* @import '~bootstrap/dist/css/bootstrap.css'; */

  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
</style>