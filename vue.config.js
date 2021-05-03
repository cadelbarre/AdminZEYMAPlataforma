module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/_variables.scss";
          @import "@/assets/foundation/_variables.scss";
          @import "@/assets/foundation/_basic.scss";
          @import "@/assets/foundation/_fonts.scss";
          @import "@/assets/foundation/_form.scss";
          @import "@/assets/foundation/_breadcrumb.scss";
        `
      }
    }
  }
};