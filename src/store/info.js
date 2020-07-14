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
        async Info({ dispatch, commit }) {
            try {
                const ID = await dispatch('getID')
                const info = (await firebase.database().ref(`/users/${ID}/info`).once('value')).val()
                commit('setInfo', info) 
            } catch(e) {
                
            }
        }
    },
    getters: {
        info: s => s.info
    }
}