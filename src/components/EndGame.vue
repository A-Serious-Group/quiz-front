<template lang="html">
    <div>
      <vs-popup 
      fullscreen
      :title="data.title" 
      :active="isActive"
      button-close-hidden
      :background-color-popup="data.color"
      >

        <div class="flex items-center justify-center" style="font-size: 2em;">
            <img :src="data.image" class="endgame-image" />
        </div>
        
        <div class="flex items-center justify-center" style="font-size: 2em; ">
            <p>Você acertou um total de {{ data.correctAnswers }} de {{ data.totalQuestions }} perguntas</p>
        </div>
        
        <div class="flex flex-col items-center justify-center" style="height: 15em;">
            <div class="mb-3 mx-auto">
              <vs-button color="#8a2253" class="w-full" @click="tryAgain()">Tentar Novamente</vs-button>
            </div>
          
            <div class="mx-auto">
              <vs-button color="#8a2253" @click="$router.push('/all-games')">
                Selecionar Quiz
              </vs-button>
            </div>
        </div>

      </vs-popup>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        
      }
    },
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        tryAgain() {
            location.reload()
        }
    }
  }
</script>

<style>
  .endgame-image {
    width: 60%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
