<template>
  <div>
    <div class="flex items-center justify-center fontt all-games-title">
      <h1>Todos os jogos</h1>
    </div>

    <vs-table 
      pagination 
      max-items="8" 
      search
      :data="listGames"
      noDataText="Sem dados disponiveis"
      id="table-all-games"
      class="p-3"
    >
    <template v-slot:header>
      <h3>Games</h3>
    </template>
    
    <template v-slot:thead>
      <vs-th sort-key="email">Nome do Quiz</vs-th>
      <vs-th sort-key="username">Qtd de Perguntas</vs-th>
      <vs-th sort-key="id">Criador</vs-th>
      <vs-th sort-key="id">Jogar</vs-th>
    </template>
    
    <template v-slot:default="{ data }">
      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
        <vs-td :data="tr.name">{{ tr.name }}</vs-td>
        <vs-td :data="1">{{ 1 }}</vs-td>
        <vs-td :data="tr.users.name">{{ tr.users.name }}</vs-td>
        <vs-td :data="tr.id">
          <i class="bi bi-play cursor-pointer" style="font-size:2em;"></i>
        </vs-td>
      </vs-tr>
    </template>
      
    </vs-table>
  </div>
</template>
  
<script>
 
 import gameApi from '@/requests/game';
 
  export default {
    name: 'AllGames',
    data:()=>({
      listGames: [],
    }),
    methods: {
      async loadGames() {
        const games = await gameApi.getAll()
        this.listGames = games.games
      }
    },
    async mounted() {
      await this.loadGames();
    }
  }
</script>
  
<style lang="scss">
  .all-games-title {
    font-size: 4em;
  }
  #table-all-games {
    tr {
      background-color: #fae0be;
      border-color: #ffdeb2;
      transform: none !important;
    }
    thead {
      background-color: #ffdeb2;

    }
    .vs-con-tbody {
      border: none;
    }
    header .con-input-search input {
      border-radius: 15px;
    }
  }
</style>
  