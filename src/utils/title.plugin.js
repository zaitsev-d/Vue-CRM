export default {
    install(Vue) {
        Vue.prototype.$title = function(title_key) {
            const app_name = process.env.VUE_APP_TITLE
            return `${title_key} | ${app_name}`
        }
    }
}
