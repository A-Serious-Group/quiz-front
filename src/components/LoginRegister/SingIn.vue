<template>
    <div>
      <vs-popup title="Cadastrar" :active="isActive" @close="$emit('isActiveFalse')">
        <div class="input-register">

            <vs-input color="#8a2253" class="mb-4" placeholder="Nome" v-model="userName"/>
            <vs-input color="#8a2253" class="mb-4" placeholder="Email" v-model="email"/>
            <vs-input color="#8a2253" :type="showPassword ? 'text' : 'password'" placeholder="Senha" v-model="password"/>

        </div>
            <div style="margin-left: 4em;">
                <vs-checkbox color="#8a2253" class="mt-4 select-none cursor-pointer" v-model="showPassword">
                    <span @click="showPassword = !showPassword">Exibir Senha</span>
                </vs-checkbox>
      
                <vs-button color="#8a2253" class="mt-6" @click="register()">
                    Registrar
                </vs-button>
            </div>
      </vs-popup>
    </div>
</template>
  
<script>
  export default {
    name: 'SingIn',
    data:()=>({
        email: '',
        userName: '',
        password: '',
        showPassword: false,
    }),
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
    },
    methods: {
        register() {
            if (!this.password || !this.email || !this.userName) {
                return this.$vs.notify({
                    title:'Atenção!',
                    text:'Não foram fornecidos os campos necessários para o cadastro',
                    color: 'danger'
                })
            }
        }
    }
  }
</script>
  
<style lang="scss" scoped>
    .input-register {
        display: flex;
        flex-direction: column;
        align-items: center;

        .vs-con-input-label {
            width: 27em;
        }
    }
</style>
  