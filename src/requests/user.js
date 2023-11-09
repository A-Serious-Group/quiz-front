import axios from 'axios';

const baseUrl = process.env.VUE_APP_API_BASE_URL 
export default {

    async create(userName, email, password) {
        return (await axios.post(
            baseUrl + '/queezy/cadastrar', {name: userName, email: email, password: password}
        )).data
    }
}