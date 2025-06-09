<template lang="html">
    <div>
        <vs-popup 
            :title="editingIndex !== null ? 'Editar Pergunta' : 'Nova Pergunta'" 
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
                    <vs-input label="Título" color="#8a2253" placeholder="Título da pergunta" v-model="question" style="width: 41.5em;"/>
                </div>

                <div class="upload-custom mt-5">
                    <div v-if="imageSrc" class="image-preview-container">
                        <img :src="imageSrc" class="preview-image" />
                        <i 
                            class="material-icons delete-image-icon" 
                            @click="deleteImage()"
                        >
                            close
                        </i>
                    </div>
                    <vs-upload
                        v-else
                        fileName="file"
                        text="Adicione uma imagem (opcional)"
                        class="mt-0 upload-custom"
                        limit="1" 
                        @on-success="successUpload"
                        :action="uploadApiUrl"
                        @on-error="errorUpload()"
                        @on-delete="deleteImage()"
                        automatic
                    />
                </div>

                <vs-row>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 questions-answer">
                            <span :key="index" v-for="(answer, index) in answers">
                                <vs-input
                                    :label="'Resposta ' + (index + 1)"
                                    v-model="answer.name"
                                    class="mt-4"
                                    style="width: 20em;"
                                    :class="index % 2 === 0 ? 'mr-6' : ''"
                                    color="#8a2253"
                                />
                                
                                <i class="material-icons select-none pointer cursor-pointer" @click="removeAnswers(index)" style="position: relative; left: 12.1em; bottom: 1.5em;">
                                    close
                                </i>
                            </span>
                            
                            <vs-button
                                v-if="answers.length < 6" 
                                type="border"
                                @click="answers.push({name:'', correct: false})"
                                style="width: 20em !important; height:3em !important; margin-top:2.5em;"
                                color="#8a2253"
                            >
                                <i class="bi bi-plus-lg"></i> Adicionar resposta
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
                :disabled="answers.length < 2"
                @click="saveQuestion()"
                >
                    Salvar
                </vs-button>
            </div>

            <vs-popup 
                title="Escolha as respostas corretas" 
                :active="openChooseCorrectQuestion"
                @close="openChooseCorrectQuestion = false"
            >
                <div :key="index" v-for="(awnser, index) in answers">
                    
                    <vs-checkbox v-model="awnser.correct" color="#8a2253" class="mt-4 select-none">
                        <span @click="awnser.correct = !awnser.correct" class="cursor-pointer select-none ml-1">
                            {{ awnser.name }}
                        </span>
                    </vs-checkbox>
                </div>

                <vs-button
                color="#8a2253"
                class="mt-6"
                @click="prepareData()"
                >
                    Salvar
                </vs-button>
            </vs-popup>
        </vs-popup>

        
    </div>
</template>
  
<script>
  export default {
    name: 'NewQuestion',
    data:()=>({
        question: '',
        answers: [
            {
                name: '',
                correct: false
            }
        ],
        openChooseCorrectQuestion: false,
        imageSrc: '',
        editingIndex: null
    }),
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
    },
    methods: {
        successUpload(response){
            this.$vs.notify({
                color:'success',
                title:'Sucesso',
                text:'Upload de arquivo feito com sucesso'
            })
            this.imageSrc = JSON.parse(response.target.response).url;
        },
        removeAnswers(index) {
            this.answers.splice(index, 1);
        },
        saveQuestion() {
            if (!this.question.trim()) {
                return this.$vs.notify({
                    color:'danger',
                    title:'Atenção',
                    text:'O Titulo da pergunta está vazio! preencha-o para continuar.'
                });
            }

            for (let index = 0; index < this.answers.length; index++) {
                
                if (this.answers[index].name.trim() === '') {
                    return this.$vs.notify({
                        color:'danger',
                        title:'Atenção',
                        text:'Há respostas vazias; preencha-as para continuar.'
                    });
                }
            }

            this.openChooseCorrectQuestion = true;
        },
        editQuestion(question, index) {
            console.log(question)
            console.log(index)
            this.question = question.question;
            this.answers = question.answer_fk.map(answer => ({
                name: answer.answers,
                correct: answer.answers_correct
            }));
            this.imageSrc = question.imagem || '';
            this.editingIndex = index;
            this.$forceUpdate();
        },
        prepareData() {
            const hasCorrectAnswer = this.answers.some(item => item.correct === true);

            if (!hasCorrectAnswer) {
                return this.$vs.notify({
                    color:'#a6a519',
                    title:'Atenção',
                    text:'Selecione ao menos uma resposta correta!'
                });
            }

            const formatedAnswers = Array.from(this.answers).map(item => {
                return {
                    name: item.name,
                    correct: item.correct,
                };
            });

            const question = {
                question: this.question,
                answers: formatedAnswers,
                image: this.imageSrc,
                imagem: this.imageSrc
            }

            this.openChooseCorrectQuestion = false;
            
            if (this.editingIndex !== null) {
                this.$emit('updateQuestion', { question, index: this.editingIndex });
                this.editingIndex = null;
            } else {
                this.$emit('addQuestion', question);
            }
        },
        deleteImage() {
            this.imageSrc = ''
        }
    },
    watch : {
        isActive(val) {
            if (val && !this.editingIndex) {
                this.question = '';
                this.imageSrc = '';
                this.answers = [
                    {
                        name: '',
                        correct: false
                    }
                ];
                this.editingIndex = null;
            }
        }
    },
    computed: {
        uploadApiUrl() {
            return process.env.VUE_APP_API_BASE_URL + '/queezy/api/upload-file/question'
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

        .upload-custom {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;

            .upload-custom {
                color: white !important;
                .btn-upload-all {
                    color: white !important;
                }
            }

            .image-preview-container {
                position: relative;
                width: 300px;
                height: 200px;
                border: 2px solid #8a2253;
                border-radius: 8px;
                overflow: hidden;

                .preview-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .delete-image-icon {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    padding: 4px;
                    cursor: pointer;
                    color: #c00808;
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(255, 255, 255, 1);
                        transform: scale(1.1);
                    }
                }
            }

            .con-img-upload {
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
    .view-upload {
        z-index: 99999 !important;
    }

@media (max-width: 670px) {
    .question-filds .question-title {
        width:auto;
    }
  }
</style>