<template>
    <div>
        <vs-popup 
            title="Configurações do Quiz" 
            :active="isActive" 
            @close="closeModal()"
            id="config-game-popup"
        >

        <div>
            <vs-divider>
                Configurações do jogo
            </vs-divider>

            <vs-checkbox v-model="restartOnError" color="#8a2253">
                <span @click="restartOnError = !restartOnError" class="cursor-pointer select-none">
                    Ao errar reiniciar o jogo
                </span>
            </vs-checkbox>
        </div>

        <div>
            <vs-divider>
                Perguntas
            </vs-divider>

            <vs-button type="border" color="#8a2253" @click="$emit('NewQuestion')">
                <i class="bi bi-plus-lg"></i> Nova Pergunta
            </vs-button>

            <div class="flex items-center justify-between mt-6 p-3" style="border:1px solid #8a2253; border-radius:10px;">
                <p class="mr-1" style="font-size:1.1em;">Nome da Pergunta</p>
                <span>
                    <i class="bi bi-pencil-square mr-2 cursor-pointer" style="color: #1f74ff; font-size:1.3em;"></i>
                    
                    <i class="bi bi-trash cursor-pointer ml-2" style="color: #c00808; font-size:1.3em;"></i>
                </span>
            </div>
        </div>

        <vs-button
            color="#8a2253"
            class="mt-7"
        >
            Salvar
        </vs-button>

        </vs-popup>
        
    </div>
  
  </template>
  
  <script>

  export default {
    name: 'ManageAccount',
  

    data:()=>({
        restartOnError: false
    }),
    methods: {
        closeModal() {
            this.$vs.dialog({
                type:'confirm',
                color: 'danger',
                title: `Deseja abandonar a criação?`,
                text: "Você tem certeza que deseja abandonar a criação do quiz? os dados não serão salvos",
                accept: () => this.$emit('isActiveFalse'),
                acceptText: 'Sim',
                cancelText: 'Cancelar',
            })
        }
    },
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
    },
    
  }
  </script>
  
<style lang="scss">
    .con-vs-dialog {
        z-index: 999999 !important;
    }
</style>
  