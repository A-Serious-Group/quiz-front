<template>
    <div>
        <vs-popup title="Login" :active="isActive" @close="$emit('isActiveFalse')">
            <div>

                <vs-input color="#8a2253" icon="person" placeholder="Search" v-model="email"/>
                <vs-input color="#8a2253" type="password" icon="lock" placeholder="Search" v-model="password"/>

            </div>
        </vs-popup>
    </div>  
  
</template>
  
<script>
  export default {
    name: 'LogIn',

    data:()=>({
        email: '',
        password: '',
    }),

    props: {
        isActive: {
            type: Boolean,
            required: true
        },
    }
  }
</script>
  
<style scoped>

</style>
  