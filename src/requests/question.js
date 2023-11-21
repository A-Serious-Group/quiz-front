import axios from './axios';

export default {

    async getById(id) {

        return (await axios.get(
            '/queezy/api/question-game/'+ id
        )).data
    },
}