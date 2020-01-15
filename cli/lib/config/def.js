const { MAX_PORT, notEmpty, validateURL, validatePort } = require("./validators");

const configDef = {
  title: {
    question: {
      message: "App title: ",
      validate: notEmpty
    }
  },
  description: {
    question: {
      message: "App description: ",
      validate: notEmpty
    }
  },
  env: {
    question: {
      message: "Environment URL: ",
      validate: validateURL
    },
    transform: value => new URL(value).toString(),
    existingApp: true
  },
  port: {
    type: "number",
    question: {
      message: "Run dev server on port: ",
      min: 0,
      max: MAX_PORT,
      initial: 4200,
      validate: validatePort
    },
    transform: value => Number(value),
    existingApp: true
  }
}

module.exports = configDef;
