import axios from './axios';

export default {

    async create(userName, email, password) {
        return (await axios.post(
            '/queezy/api/queezy/cadastrar', {name: userName, email: email, password: password}
        )).data
    },

    async login(email, password) {
        return (await axios.post(
            '/auth/api/auth-login', {email:email, password: password}
        )).data
    }
}