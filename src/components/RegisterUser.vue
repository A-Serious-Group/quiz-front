<template>
  <div>
    <div class="user-icon-container">
      <i 
         class="material-icons p-2 text-white select-none pointer cursor-pointer" 
         style="font-size: 4vh;"
         @click="checkUserLogged()"
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

    <UserOptions
      :isActive="openUserOptions"
      @isActiveFalse="openUserOptions = false"
    />

  </div>

</template>

<script>

import LogIn from '@/components/LoginRegister/LogIn.vue'
import SingIn from '@/components/LoginRegister/SingIn.vue'
import UserOptions from '@/components/UserOptions'

export default {
  name: 'RegisterUser',

  components: {
    LogIn,
    SingIn,
    UserOptions
  },
  data:()=>({
      openLogInPopUp: false,
      openSingInPopUp: false,
      openUserOptions: false,
  }),
  methods: {
    switchModal() {
      this.openLogInPopUp  = !this.openLogInPopUp
      this.openSingInPopUp = !this.openSingInPopUp
    },
    checkUserLogged() {
      if (localStorage.getItem('access_token')) {
        this.openUserOptions = true;
      }
      else {
        this.openLogInPopUp = true;
      }
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
