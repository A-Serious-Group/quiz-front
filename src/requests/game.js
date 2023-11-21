import axios from './axios';

export default {

    async getByUserId(userId = null) {
        if (!userId) {
            userId = JSON.parse(localStorage.getItem('userInfo')).id_user;
        }

        return (await axios.get(
            '/queezy/api/get-id-user/'+ userId
        )).data
    },

    async delete(id) {
        return (await axios.delete(
            '/queezy/api/game/'+ id
        )).data
    },

    async createGame(data) {
        const userId = JSON.parse(localStorage.getItem('userInfo')).id_user;
        data.user_id = userId

        return (await axios.post(
            '/queezy-question-answer', data
        )).data
    }
}
