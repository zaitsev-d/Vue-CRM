import firebase from 'firebase/app'

export default {
    actions: {
        async fetchCategories({ commit, dispatch }){
            try {
                const ID = await dispatch('getID')
                const categories = (await firebase.database().ref(`/users/${ID}/categories`).once('value')).val() || {}

                return Object.keys(categories).map(key => ({...categories[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchCategoryByID({ commit, dispatch }, id){
            try {
                const ID = await dispatch('getID')
                const category = (await firebase.database().ref(`/users/${ID}/categories`).child(id).once('value')).val() || {}

                return { ...category, id }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async createCategory({ commit, dispatch }, { title, limit }) {
            try {
                const ID = await dispatch('getID')
                const category = await firebase.database().ref(`/users/${ID}/categories`).push({ title, limit })
                return { title, limit, id: category.key }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async updateCategory({ commit, dispatch }, { title, limit, id }) {
            try {
                const ID = await dispatch('getID')
                await firebase.database().ref(`/users/${ID}/categories`).child(id).update({ title, limit })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}