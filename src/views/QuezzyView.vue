<template>
   <div class="quezzy-home">
     <div class="img-logo select-none" style="height:80vh;">
       <img src="../assets/logoqueezy.png" alt="Logo Queezy">
      </div>

      <div style="text-align: center;">
        <vs-button color="#8a2253" class="fontt" style="width: 18em; border-radius:15px; font-size:3em;">
          Começar
        </vs-button>
      </div>

      <RegisterUser/>
   </div>
 </template>
 
<script>
  import RegisterUser from '@/components/RegisterUser.vue';

  export default {
    name: 'QuezzyView',

    components: {
      RegisterUser
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
 </style>
 