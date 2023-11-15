<template>
    <div>
        <vs-popup 
            id="popup-right-side" 
            title="" 
            :active="isActive" 
            @close="$emit('isActiveFalse')" 
            position="top-right"
            background-color-popup="#8a2253"
        >
            
            <div class="flex items-center justify-center flex-wrap flex-col items-stretch" style="height: 100% !important;">
                <div class="flex flex-col items-stretch space-y-7">
                    <vs-button color="#cbaca4" class="button-user-options">
                        Gerenciar Quiz
                    </vs-button>
            
                    <vs-button color="#cbaca4" class="button-user-options">
                        Gerenciar Conta
                    </vs-button>
            
                    <vs-button color="#cbaca4" class="button-user-options" @click="logout()">
                        Sair
                    </vs-button>
                </div>
            </div>
            
        </vs-popup>
    </div>
  
  </template>
  
  <script>
  
  export default {
    name: 'UserOptions',
  

    data:()=>({
        
    }),
    methods: {
        logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('userInfo');
            location.reload();
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

  #popup-right-side {
    .vs-popup {
        margin-left: 73% !important;
        width:450px !important;
        height: 87vh;
    }

    .vs-popup--content {
        height: 90% !important;
    }

    .button-user-options {
        font-size: 1.8em; 
        font-weight:400; 
        border-radius:18px;
    }
  }
  


  @media (max-width: 600px) {
    #popup-right-side .vs-popup {
        margin-left: 0 !important;
        width: max-content;
        height: 85vh;
      }
  }
  </style>
  