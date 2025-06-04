<template>
    <div>

        <h1 class="fontt p-3 pb-0" style="font-size: 3em;">{{ game.name }}</h1>
        <vs-divider></vs-divider>

        <div class="question-filds">
            <div class="flex items-center justify-center question-title mb-6">
                <h1 style="font-size: 3em;" class="fontt">{{ questions[currentQuestion].question }}</h1>
            </div>

            <div class="upload-custom mt-5">
                <img 
                    :src="questions[currentQuestion].imagem" 
                    v-if="questions[currentQuestion].imagem"
                    class="quiz-image"
                >
            </div>

            <vs-row class="mt-6">
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3 questions-answer">
                        <span class="mt-5" :key="index" v-for="(answer, index) in questions[currentQuestion].answer_fk">
                            <vs-button 
                                class="mt-2 h-full" 
                                style="width: 20em;" 
                                color="#8a2253" 
                                @click="selectAnswer(answer)"
                            >
                                <!-- <span class="fontt" style="font-size:2em;">{{ answer.answers }}</span> -->
                                {{ answer.answers }}
                            </vs-button>
                        </span>
                    </div>
                </vs-col>
            </vs-row>
        </div>

        <EndGame
            :is-active="openEndGameModal"
            :data="endGameData"
        />
    </div>
</template>
  
<script>
    import questionApi from '@/requests/question'
    import gameApi from '@/requests/game'

    import EndGame from '@/components/EndGame.vue';

export default {
    components: {
        EndGame
    },
    data:()=>({
        game: {},
        questions: [
            {
                question: '',
                game_id: null,
                id_question: null,
                imagem: '',
                question_user_id: null,
                answer_fk: [
                    {
                        answers: '',
                        answers_correct: false,
                        id_answer: null, 
                        question_id: null
                    }
                ]

            }
        ],
        currentQuestion: 0,
        correctAnswers: 0,
        // wrongAnswers: 0,
        openEndGameModal: false,
        endGameData: {
            title: '',
            color: '',
            text: '',
            totalQuestions: 0,
            correctAnswers: 0,
        }
    }),
    methods: {
        async setGame() {
            this.$vs.loading({
                type:'radius',
                color: '#8a2253'
            })
            this.currentQuestion = 0;

            const gameId = this.$route.params.gameId
            await questionApi.getById(gameId)
            .then((response) => {
                this.questions = JSON.parse(JSON.stringify(response))
            })

            await gameApi.getOne(gameId)
            .then((response) => {
                this.game = response.game
                this.$vs.loading.close();
            })
        },
        selectAnswer(awnser) {
            const totalQuestions = (this.questions.length);

            if (this.game.restartOnError && !awnser.answers_correct) {
                this.endGameData = {
                    title: 'Você Perdeu',
                    color: 'red',
                    text:  'Você Perdeu',
                    totalQuestions: totalQuestions,
                    correctAnswers: this.correctAnswers,
                }
                this.openEndGameModal = true;
                return
            }

            // !awnser.answers_correct ? this.wrongAnswers += 1 : this.correctAnswers += 1;
            if (awnser.answers_correct) {
                this.correctAnswers += 1;
            }

            if (this.currentQuestion < (this.questions.length - 1)) {

                this.currentQuestion += 1
            }
            else {
                if ((totalQuestions) === this.correctAnswers) {
                    this.endGameData = {
                        title: 'Você Ganhou',
                        color: 'green',
                        text:  'Parabéns Você Ganhou!',
                        totalQuestions: totalQuestions,
                        correctAnswers: this.correctAnswers,
                    }
                }
                else if (this.correctAnswers >= (totalQuestions / 2) ) {
                    this.endGameData = {
                        title: 'Quase lá',
                        color: 'yellow',
                        text:  'Você acertou mais da metade das perguntas!',
                        totalQuestions: totalQuestions,
                        correctAnswers: this.correctAnswers,
                    }
                }
                else {
                    this.endGameData = {
                        title: 'Você perdeu',
                        color: 'red',
                        text: 'Você perdeu! tente novamente!',
                        totalQuestions: totalQuestions,
                        correctAnswers: this.correctAnswers,
                    }
                }
                this.openEndGameModal = true;
            }
        }
    },
    async mounted() {
        await this.setGame()
    }
}   
</script>
  
<style lang="scss">
    .upload-custom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px; /* ajuste conforme necessário */
    }
    .quiz-image {
        max-width: 350px;
        max-height: 250px;
        width: auto;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        object-fit: contain;
        display: block;
        margin: 0 auto;
    }
</style>