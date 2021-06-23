const path = require("path");

module.exports = function (/** @type {import('plop').NodePlopAPI} */ plop) {
  plop.setGenerator("create", {
    description: "create zhitian component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name please",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: path.resolve(process.cwd(), "./packages/src/{{name}}"),
        templateFiles: [
          "templates/index.ztc.hbs",
          "templates/data.config.json.hbs",
          "templates/data.default.json.hbs",
          "templates/style.config.json.hbs",
          "templates/style.default.json.hbs",
          "templates/interaction.config.json.hbs",
          "templates/interaction.default.json.hbs",
        ],
      },
    ],
  });
};