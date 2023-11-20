<template lang="html">
    <div>
        <vs-popup 
            title="Nova Pergunta" 
            :active="isActive" 
            button-close-hidden
            id="popup-new-question"
        >
        <!-- <h1 style="font-size: 3em;" class="p-5 pb-3 fontt">Criar novo jogo</h1> -->

            <i 
            class="material-icons p-1 mb-2 select-none pointer cursor-pointer arrow-icon"
            @click="$emit('switchModal')">
                arrow_back
            </i>

            <div class="question-filds">
                <div class="flex items-center justify-center question-title">
                    <vs-input label="Título" color="#8a2253" placeholder="Título da pergunta" v-model="title" style="width: 41.5em;"/>
                </div>

                <div class="upload-custom mt-5">
                    <vs-upload
                        text="Adicione uma imagem (opcional)"
                        class="mt-0"
                        limit="1" 
                        action="https://jsonplaceholder.typicode.com/posts/" 
                        @on-success="successUpload()"
                    />
                </div>

                <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 questions-answer">
                            <span :key="index" v-for="index in inputs.length">
                                <vs-input
                                :label="'Resposta ' + (index)"
                                v-model="inputs[index - 1]"
                                type="text"
                                :id="'input' + index"
                                class="mt-4"
                                style="width: 20em;"
                                :class="index % 2 === 0 ? 'mr-6' : ''"
                                color="#8a2253"
                                />
                                
                                <i class="material-icons select-none pointer cursor-pointer" @click="removeInput(index)" style="position: relative; left: 12.1em; bottom: 1.5em;">
                                    close
                                </i>
                            </span>
                            
                            <vs-button
                                v-if="inputs.length < 6" 
                                type="border"
                                @click="inputs.push('')"
                                style="width: 20em !important; height:3em !important; margin-top:2.5em;"
                                color="#8a2253"
                            >
                                <i class="bi bi-plus-lg"></i> Adicoinar resposta
                            </vs-button>
                        </div>
                    </vs-col>
                    
                </vs-row>
            </div>

            <div class="flex items-center justify-center">
                <vs-button
                style="width: 41.5em !important; height:3em !important;"
                color="#8a2253"
                class="mt-2 mr-5"
                :disabled="inputs.length < 2"
                @click="configGame()"
                >
                    Salvar
                </vs-button>
            </div>
        </vs-popup>
    </div>
</template>
  
<script>
  export default {
    name: 'NewQuestion',
    data:()=>({
        title: '',
        inputs: [
            ''
        ],
    }),
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
    },
    methods: {
        successUpload(){
            this.$vs.notify({
                color:'success',
                title:'Sucesso',
                text:'Upload de arquivo feito com sucesso'
            })
        },
        removeInput(index) {
            this.inputs.splice(index -1, 1);
        },
        configGame() {
            for (let index = 0; index < this.inputs.length; index++) {
                
                if (this.inputs[index].trim() === '') {
                    return this.$vs.notify({
                        color:'danger',
                        title:'Atenção',
                        text:'Há respostas vazias; preencha-as para continuar.'
                    });
                }
            }
        }
    }
  }
</script>
  
<style lang="scss">
    .question-filds {
        input {
            border-radius: 8px;
        }
        .vs-con-input-label {
            width: 27em;
        }

        .upload-custom .con-img-upload {
            display: flex;
            justify-content: center;

            .con-input-upload {
                background-color: #8a2253;
                .vs-upload--button-upload {
                    color:#f2cb05;
                }
            }
            .img-upload {
                margin-left: 14.5em;
            }
        }
        .questions-answer {
            .vs-con-input input {
                height: 3em;
            }
            span .float-icon {
                display: flex;
                position: relative;
                top: -1.5em;
                transition: .2s;
                flex-direction: row-reverse
            }
            span .float-icon:hover {
                color: #c00808;
                transition: .2s;
            }
        }
        

    }
    #popup-new-question {
        .vs-popup {
            
            width:850px !important;
        }
    }
@media (max-width: 670px) {
    .question-filds .question-title {
        width:auto;
    }
  }
</style>