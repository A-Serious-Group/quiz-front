<template>
    <div>
        <vs-popup 
            title="" 
            :active="isActive" 
            @close="$emit('backModal')" 
            position="top-right"
            background-color-popup="#8a2253"
        >

        <h1 class="flex justify-center text-white font-bold mb-4" style="font-size:1.5em;">
            GERENCIAR CONTA
        </h1>

        <div class="input-update-user">
            <vs-input color="white" label="Nome" class="mb-4" v-model="userName"/>
            <vs-input
             color="white" 
             label="Email" 
             name="email"
             class="mb-4" 
             v-model="email"
            />
            
            <!-- <vs-input 
              color="white" 
              type="password" 
              label="Senha"
              v-model="password"
              class="mb-4"
            /> -->
        </div>

        <div style="text-align: center;">
            
            <vs-button color="#c88c98" class="mt-5" @click="updateUser()">
                <span class="font-bold p-6" style="font-size:1.5em;">SALVAR</span>
            </vs-button>
        </div>
            
        </vs-popup>
    </div>
  
  </template>
  
  <script>
  import userApi from '@/requests/user'

  export default {
    name: 'ManageAccount',
  

    data:()=>({
        userName: '',
        email: '',
        password: '',
    }),
    methods: {
        async updateUser() {
            if (!this.email || !this.userName) {
                return this.$vs.notify({
                    title:'Atenção!',
                    text: 'É necessario todos os campos preenchidos para fazer a atualização do Usuário',
                    color: 'danger'
                }) 
            }

            await userApi.update(this.currentUser.id_user, this.userName, this.email)
            .then((response) => {

                let updatedUser   = this.currentUser;
                updatedUser.email = response.user.email
                updatedUser.name  = response.user.name

                localStorage.removeItem('userInfo');
                localStorage.setItem('userInfo', JSON.stringify(updatedUser))

                this.$vs.notify({
                    title:'Sucesso',
                    text: response.mensagem,
                    color: 'success'
                })

                this.$emit('isActiveFalse');
            })
            .catch((error) => {
                console.log('ERROR', error)
            })
        }
    },
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
    },
    watch: {
        isActive(val) {
            if (val) {
                this.email    = this.currentUser.email;
                this.userName = this.currentUser.name;
            }
        }
        
    },
    computed: {
        currentUser() {
            return JSON.parse(localStorage.getItem('userInfo'));
        }
    }
  }
  </script>
  
<style lang="scss">
    .input-update-user {
        display: flex;
        flex-direction: column;
        align-items: center;

        .input-group {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .vs-con-input-label {
            width: 27em;
        }
        input {
            border-radius: 18px;
            background-color: #c88c98;
        }
        .input-span-placeholder {
            color: white !important;
        }
        .vs-input-white .vs-input--label {
            color: white;
            font-size: 1.2em;
        }
    }
</style>
  