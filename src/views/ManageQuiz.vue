<template lang="html">
  <div>
    <h1 style="font-size: 3em;" class="p-5 fontt select-none">Lista de jogos Criados</h1>

    <div class="pl-5 pb-2">
      <vs-button type="border" color="#8a2253" @click="openGameSettings = true">
        <i class="bi bi-plus-lg"></i> Novo Jogo
      </vs-button>
    </div>

    <div class="relative overflow-x-auto p-5" id="game-table">
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
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">
              Tuba
            </td>
            <td class="px-6 py-4 select-none">
              <i class="bi bi-pencil-square mr-2 cursor-pointer" style="color: #1f74ff; font-size:1.6em;"></i>

              <i class="bi bi-trash cursor-pointer" style="color: #c00808; font-size:1.6em;" @click="deleteGame()"></i>
            </td>

          </tr>
        </tbody>
      </table>
    </div>

    <NewQuestion
      :is-active="openNewQuestion" 
      @isActiveFalse="openNewQuestion = false"
      @switchModal="changeModalOrder()"
    />

    <GameSettings
      :is-active="openGameSettings" 
      @isActiveFalse="openGameSettings = false"
      @NewQuestion="changeModalOrder()"
    />
  </div>
</template>

<script>
import NewQuestion from '@/components/NewQuestion.vue'
import GameSettings from '@/components/GameSettings.vue'

export default {
  data:()=>({
    openNewQuestion: false,
    openGameSettings: false,
  }),
  components: {
    NewQuestion,
    GameSettings
  },
  methods: {
    deleteGame() {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `Atenção!`,
        text: "Você tem certeza que deseja deletar o quiz",
        // accept: () => this.$refs.fileInput.click(),
        acceptText: 'Deletar',
        cancelText: 'Cancelar',
      })
    },
    changeModalOrder() {
      this.openNewQuestion = !this.openNewQuestion
      this.openGameSettings = !this.openGameSettings
    }
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