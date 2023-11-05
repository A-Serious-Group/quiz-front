<template>
  <div>
    <div class="user-icon-container">
      <i 
         class="material-icons p-2 text-white select-none pointer cursor-pointer" 
         style="font-size: 4vh;"
         @click="openLogInPopUp = true"
      >person</i>
    </div>


    <LogIn
      :isActive="openLogInPopUp"
      @isActiveFalse="openLogInPopUp = false"
    />

  </div>

</template>

<script>

import LogIn from '@/components/LoginRegister/LogIn.vue'

export default {
  name: 'RegisterUser',

  components: {
   LogIn
  },
  data:()=>({
      openLogInPopUp: false
  })
}
</script>

<style scoped>
.user-icon-container {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #8a2253;
  border-radius: 30px;
}
</style>
