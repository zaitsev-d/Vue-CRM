import firebase from 'firebase/app'

export default {
    actions: {
        async CreateRecord({ dispatch, commit }, record) {
            try {
                const ID = await dispatch('getID')
                return await firebase.database().ref(`/users/${ID}/records`).push(record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async getRecords({ dispatch, commit }) {
            try {
                const ID = await dispatch('getID')
                const records = (await firebase.database().ref(`/users/${ID}/records`).once('value')).val() || {}

                return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}