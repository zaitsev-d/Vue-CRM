export default {
  install (Vue, option) {
    Vue.prototype.$message = function (html) {
      window.M.toast({ html })
    }

    Vue.prototype.$error = function (html) {
      window.M.toast({ html: `[Error]: ${html}` })
    }
  }
}
