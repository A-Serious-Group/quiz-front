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

            <vs-input 
                v-model="gameName"
                class="pl-1 pb-2 game-name-input" 
                label="Nome do Game" 
                color="#8a2253" 
                placeholder="Digite o nome do jogo"
            />

            <vs-checkbox v-model="restartOnError" color="#8a2253" class="mt-4">
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

            <div 
                class="flex items-center justify-between mt-6 p-3" 
                style="border:1px solid #8a2253; border-radius:10px;"
                v-for="(question, index) in questions"
                :key="index"
            >
                <div class="flex items-center">
                    <p class="mr-1" style="font-size:1.1em;">{{ question.question }}</p>
                    <img v-if="question.image || question.imagem" :src="question.image || question.imagem" class="question-image" />
                </div>
                <span>
                    <i 
                        class="bi bi-pencil-square mr-2 cursor-pointer" 
                        style="color: #1f74ff; font-size:1.3em;"
                        @click="$emit('editQuestion', { question, index })"
                    />
                    
                    <i
                        class="bi bi-trash cursor-pointer ml-2" 
                        style="color: #c00808; font-size:1.3em;"
                        @click="$emit('removeQuestion', index)"
                    />
                </span>
            </div>
        </div>

        <vs-button
            color="#8a2253"
            class="mt-7"
            :disabled="questions.length <= 0 || ! this.gameName"
            @click="saveGame"
        >
            Salvar
        </vs-button>

        </vs-popup>
        
    </div>
  
  </template>
  
<script>
    import gameApi from '@/requests/game';
    export default {
        name: 'ManageAccount',

        data:()=>({
            restartOnError: false,
            gameName: '',
            gameId: null,
        }),
        methods: {
            closeModal() {
                if (!this.gameName || !this.questions) {
                    return this.resetData();
                }
                this.$vs.dialog({
                    type:'confirm',
                    color: 'danger',
                    title: `Deseja abandonar a criação?`,
                    text: "Você tem certeza que deseja abandonar a criação do quiz? os dados não serão salvos",
                    accept: () => this.resetData(),
                    acceptText: 'Sim',
                    cancelText: 'Cancelar',
                })
            },
            resetData() {
                this.gameName = '';
                this.restartOnError = false;
                this.$emit('isActiveFalse');
            },
            async saveGame() {
                const questionsArray = JSON.parse(JSON.stringify(this.questions));
                const data = {
                    question: questionsArray,
                    game_name: this.gameName,
                    restartOnError: this.restartOnError
                }

                if (this.isUpdate) {
                    data.id_game = this.gameId;
                    await gameApi.updateGame(data)
                    .then(() => {
                        this.$vs.notify({
                            color:'success',
                            title:'Sucesso',
                            text:'Game atualizado com Sucesso'
                        })
                        this.$emit('gameCreated');
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$vs.notify({
                            color:'danger',
                            title:'Erro',
                            text:'Não foi possível atualizar o game'
                        })
                    })
                } else {
                    await gameApi.createGame(data)
                    .then(() => {
                        this.$vs.notify({
                            color:'success',
                            title:'Sucesso',
                            text:'Game criado com Sucesso'
                        })
                        this.$emit('gameCreated');
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$vs.notify({
                            color:'danger',
                            title:'Erro',
                            text:'Não foi possível criar o game'
                        })
                    })
                }
            },
        },
        props: {
            isActive: {
                type: Boolean,
                required: true
            },
            questions: {
                type: Object,
                required: true
            },
            data: {
                type: Object,
                required: false
            },
            isUpdate: {
                type: Boolean,
                required: true
            }
        },
        watch: {
            isActive(val) {
                if (val && this.isUpdate) {
                    this.gameName = this.data.name
                    this.restartOnError = this.data.restartOnError
                    this.gameId = this.data.id_game
                }
            }
        }
    }
</script>
  
<style lang="scss">
    .con-vs-dialog {
        z-index: 999999 !important;
    }
    .game-name-input input {
        border-radius: 8px;
    }
    .question-image {
        width: 40px;
        height: 40px;
        object-fit: cover;
        border-radius: 4px;
        margin-left: 10px;
    }
</style>
  