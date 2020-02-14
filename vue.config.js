module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/theme/variables.scss";
          @import "@/theme/reset.scss";
        `
      }
    }
  }
}
