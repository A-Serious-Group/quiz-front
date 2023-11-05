<template>
    <div>
      <vs-popup title="Login" :active="isActive" @close="$emit('isActiveFalse')">
        <div class="input-register">
          <vs-input color="#8a2253" class="mb-4" icon="person" placeholder="Email" v-model="email"/>
          <vs-input color="#8a2253" type="password" icon="lock" placeholder="Password" v-model="password"/>
        </div>

        <p style="margin-left: 3.8em;" class="mt-3">
            Não tem conta? Cadastre-se
        </p>

        <vs-button color="#8a2253" class="mt-4" style="margin-left: 3.8em;" @click="login()">
            Login
        </vs-button>
      </vs-popup>
    </div>
</template>
  
<script>
  export default {
    name: 'LogIn',
    data:()=>({
        email: '',
        password: '',
    }),
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
    },
    methods: {
        login() {
            if (!this.password || !this.email) {
                return this.$vs.notify({
                    title:'Atenção!',
                    text:'Não foram fornecidos os campos necessários para o Login',
                    color: 'danger'
                })
            }
        }
    }
  }
</script>
  
<style lang="scss">
    .input-register {
        display: flex;
        flex-direction: column;
        align-items: center;

        .vs-con-input-label {
            width: 45vh;
        }
    }
</style>
  