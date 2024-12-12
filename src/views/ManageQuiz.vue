<template lang="html">
  <div>
    <h1 style="font-size: 3em;" class="p-5 fontt select-none">Lista de jogos Criados</h1>

    <div class="pl-5 pb-2">
      <vs-button type="border" color="#8a2253" @click="openGameSettings = true">
        <i class="bi bi-plus-lg"></i> Novo Jogo
      </vs-button>
    </div>

    <div class="relative overflow-x-auto p-5" id="game-table" v-if="games.length > 0">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nome
            </th>
            <th scope="col" class="px-6 py-3">
              Ações
            </th>

          </tr>
        </thead>
        <tbody>
          <tr 
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" 
            :key="index" 
            v-for="(game, index) in games"
          >
            <td class="px-6 py-4">
              {{ game.name }}
            </td>
            <td class="px-6 py-4 select-none">
              <i class="bi bi-pencil-square mr-2 cursor-pointer" style="color: #1f74ff; font-size:1.6em;" @click="updateGame(game)"></i>

              <i class="bi bi-trash cursor-pointer" style="color: #c00808; font-size:1.6em;" @click="confirmDelete(game)"></i>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <vs-divider v-else>
      Nenhum resgistro encontrado
    </vs-divider>

    <NewQuestion
      :is-active="openNewQuestion" 
      @isActiveFalse="openNewQuestion = false"
      @switchModal="changeModalOrder()"
      @addQuestion="addQuestion"
    />

    <GameSettings
      :is-active="openGameSettings" 
      @isActiveFalse="closeGameSettings()"
      @NewQuestion="changeModalOrder()"
      :questions="questions"
      @removeQuestion="removeQuestion()"
      @gameCreated="gameCreated()"
      :isUpdate="isUpdate"
      :data="dataToUpdate"
    />
  </div>
</template>

<script>
import gameApi from '@/requests/game'
import questionApi from '@/requests/question'

import NewQuestion from '@/components/NewQuestion.vue'
import GameSettings from '@/components/GameSettings.vue'

export default {
  data:()=>({
    openNewQuestion: false,
    openGameSettings: false,
    games: [],
    questions: [],
    isUpdate: false,
    dataToUpdate: {}
  }),
  components: {
    NewQuestion,
    GameSettings
  },
  methods: {
    confirmDelete(game) {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Atenção!`,
        text: `Você tem certeza que deseja deletar o quiz ${game.name}`,
        accept: () => this.deleteGame(game.id_game),
        acceptText: 'Deletar',
        cancelText: 'Cancelar',
      })
    },
    async updateGame(game) {
      this.dataToUpdate = game;
      this.questions = await this.setQuestions(game.id_game);
      this.isUpdate = true;
      this.openGameSettings = true;
    },
    async loadGames() {
      this.$vs.loading({
        type:'radius',
        color: '#8a2253'
      })
      await gameApi.getByUserId()
      .then((response) => {
        this.games = response.users
        this.$vs.loading.close();
      }) 
    },
    async deleteGame(id) {
      await gameApi.delete(id)
      .then(async (response) => {
        this.$vs.notify({
          color:'success',
          title:'Sucesso',
          text: response
        })
        await this.loadGames();
      })
      .catch((error) => {
        console.log(error)
        return this.$vs.notify({
          color:'danger',
          title:'Atenção',
          text: 'Não foi possivel fazer deletar esse Quiz!'
        })
      })
    },
    changeModalOrder() {
      this.openNewQuestion = !this.openNewQuestion
      this.openGameSettings = !this.openGameSettings
    },
    addQuestion(newQuestion) {
      this.questions.push(newQuestion)
      this.changeModalOrder();
    },
    closeGameSettings() {
      this.openGameSettings = false;
      this.isUpdate = false;
      this.questions = [];
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },
    async gameCreated() {
      this.openGameSettings = false;
      await this.loadGames();
    },
    async setQuestions(id) {
      return await questionApi.getById(id)
    }
  },
  async mounted() {
    await this.loadGames();
  }
}
</script>

<style lang="scss">
 #game-table {
  table thead tr {
    background-color: #ffdeb2;
  }
  tbody tr {
    background-color: #fae0be;
  }
 }
</style>