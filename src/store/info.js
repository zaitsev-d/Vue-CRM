import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
           state.info = info 
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async UpdateInfo ({ dispatch, commit, getters }, toUpdate) {
            try {
                const ID = await dispatch('getID')
                const updateData = { ...getters.info, ...toUpdate }
                await firebase.database().ref(`/users/${ID}/info`).update(toUpdate)
                commit('setInfo', updateData)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async Info({ dispatch, commit }) {
            try {
                const ID = await dispatch('getID')
                const info = (await firebase.database().ref(`/users/${ID}/info`).once('value')).val()
                commit('setInfo', info) 
            } catch(e) {
                commit('setError', e)
                throw e
            }
        }
    },
    getters: {
        info: s => s.info
    }
}