<template>
    <div>

        <h1 class="fontt-new p-3 pb-0" style="font-size: 3em;">{{ game.name }}</h1>
        <vs-divider></vs-divider>

        <div class="question-filds">
            <div class="flex items-center justify-center question-title mb-6">
                <h1 style="font-size: 3em;" class="fontt-new">{{ questions[currentQuestion].question }}</h1>
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
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3 questions-answer">
                        <span class="mt-5" :key="index" v-for="(answer, index) in questions[currentQuestion].answer_fk">
                            <vs-button 
                                class="mt-2 h-full" 
                                style="width: 15em;" 
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
            textColor: '',
            totalQuestions: 0,
            correctAnswers: 0,
            image: ''
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
                    color: '#ff999a',
                    text:  'Você Perdeu',
                    textColor: '#7a0001',
                    totalQuestions: totalQuestions,
                    correctAnswers: this.correctAnswers,
                    image: "https://res.cloudinary.com/dcaufvn3n/image/upload/v1749494617/jcxtuvernxoutdf39nfj.png"
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
                        color: '#b5ffb8',
                        text:  'Parabéns Você Ganhou!',
                        textColor: '#007811',
                        totalQuestions: totalQuestions,
                        correctAnswers: this.correctAnswers,
                        image: "https://res.cloudinary.com/dcaufvn3n/image/upload/v1749494573/mkf8m6arsa0ohoisqd1v.png"
                    }
                }
                else if (this.correctAnswers >= (totalQuestions / 2) ) {
                    this.endGameData = {
                        title: 'Quase lá',
                        color: '#fbff99',
                        textColor: '#c55c00',
                        text:  'Você acertou mais da metade das perguntas!',
                        totalQuestions: totalQuestions,
                        correctAnswers: this.correctAnswers,
                        image: "https://res.cloudinary.com/dcaufvn3n/image/upload/v1749494525/fvxfayhpx8qukk2glhdb.png"
                    }
                }
                else {
                    this.endGameData = {
                        title: 'Você perdeu',
                        color: '#ff999a',
                        text: 'Você perdeu! tente novamente!',
                        textColor: '#7a0001',
                        totalQuestions: totalQuestions,
                        correctAnswers: this.correctAnswers,
                        image: "https://res.cloudinary.com/dcaufvn3n/image/upload/v1749494617/jcxtuvernxoutdf39nfj.png"
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
    @font-face {
        font-family: 'Kindergarten';
        src: url('@/assets/kindergarten.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

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

    .fontt-new {
        font-family: "Kindergarten", "Montserrat", Helvetica, Arial, sans-serif !important;
        font-weight: 400
    }
</style>