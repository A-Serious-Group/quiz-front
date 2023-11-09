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
      @createUser="switchModal()"
    />

    <SingIn
      :isActive="openSingInPopUp"
      @isActiveFalse="openSingInPopUp = false"
      @switchModal="switchModal()"
    />

  </div>

</template>

<script>

import LogIn from '@/components/LoginRegister/LogIn.vue'
import SingIn from '@/components/LoginRegister/SingIn.vue'

export default {
  name: 'RegisterUser',

  components: {
    LogIn,
    SingIn
  },
  data:()=>({
      openLogInPopUp: false,
      openSingInPopUp: false,
  }),
  methods: {
    switchModal() {
      this.openLogInPopUp  = !this.openLogInPopUp
      this.openSingInPopUp = !this.openSingInPopUp
    }
  }
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
