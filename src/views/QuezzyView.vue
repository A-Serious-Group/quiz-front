<template>
   <div class="quezzy-home">
     <div class="img-logo select-none" style="height: 70vh;">
       <img src="../assets/logoqueezy.png" alt="Logo Queezy">
      </div>

      <div style="text-align: center;">
        <vs-button color="#8a2253" class="fontt button-start" style="border-radius:15px; font-size:3em;">
          Começar
        </vs-button>
      </div>

      <UserInterface/>
   </div>
 </template>
 
<script>
  import UserInterface from '@/components/UserInterface.vue';

  export default {
    name: 'QuezzyView',

    components: {
      UserInterface
    }
  }
</script>
 
<style>
  body {
    background-color: #feecd4;
  }
 
  .img-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
  }
 
  .img-logo img {
    width: 60%;
    max-height: 100%;
  }

  .button-start {
    width: 18em;
  }
  
  @media (max-width: 670px) {
    .button-start {
        width:auto;
    }
  }
</style>
 