const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env :
    {
      "URL" : "https://testautomationpractice.blogspot.com/"
      
    },
  

});
