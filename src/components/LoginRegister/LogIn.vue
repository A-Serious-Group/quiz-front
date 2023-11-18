<template>
    <div>
      <vs-popup title="Login" :active="isActive" @close="$emit('isActiveFalse')">
        <div class="input-register">
          <vs-input color="#8a2253" class="mb-4" icon="person" placeholder="Email" v-model="email"/>
          
          <vs-input 
            color="#8a2253" 
            type="password" 
            icon="lock" 
            placeholder="Senha" 
            v-model="password" 
            @keydown.enter="login()"
          />
        </div>

        <p style="margin-left: 4em;" class="mt-3 cursor-pointer link-hover" @click="$emit('createUser')">
            Não tem conta? Cadastre-se
        </p>

        <vs-button color="#8a2253" class="mt-4" style="margin-left: 4em;" @click="login()">
            Login
        </vs-button>
      </vs-popup>
    </div>
</template>
  
<script>
    import userApi from '@/requests/user'

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
            async login() {
                if (!this.password || !this.email) {
                    return this.$vs.notify({
                        title:'Atenção!',
                        text:'Não foram fornecidos os campos necessários para o Login',
                        color: 'danger'
                    })
                }

                await userApi.login(this.email, this.password)
                .then((response) => {

                    if (response.status != 401) {

                        this.$vs.notify({
                            title:'Atenção!',
                            text:response.mensagem,
                            color: 'success'
                        })
                        
                        localStorage.setItem('access_token', response.user.access_token);
                        localStorage.setItem('userInfo', JSON.stringify(response.user));
                        this.$emit('isActiveFalse');
                    } else {
                        return this.$vs.notify({
                            title:'Atenção',
                            text: response.response.mensagem,
                            color: 'danger'
                        })
                    }

                })
                .catch((error) => {
                    console.log("ERROR",error.response.data)
                    return this.$vs.notify({
                        title:'Atenção!',
                        text: error.response.data.message[0],
                        color: 'danger'
                    })
                })
            }
        },
        watch: {
            isActive(val) {
                if (val) {
                    this.email    = ''
                    this.password = ''
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
            width: 27em;
        }
    }
    .link-hover:hover {
        transition: .2s;
        color: #8a2253;
        font-size: 17px;
    }
    .link-hover {
        transition: .2s;
    }
</style>
  