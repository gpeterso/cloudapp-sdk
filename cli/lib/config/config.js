const _ = require("lodash");

const fs = require("fs-extra");
const prompts = require("prompts");

const { cwd, workNg } = require("../dirs");
const configDef = require("./def");

const validateConfig = config => {
  if (!config || (Object.keys(config)||[]).length === 0) {
    return Object.keys(configDef);
  }
  console.log('configDef', configDef)
  const keys = [];
  for (let key in config) {
    const def = configDef[key];
    console.log('key', key)
    console.log('def', def)
    if (def && def.validate && !def.validate(config[key])) {
      keys.push(key);
    }
  };
  for (let key in configDef) {
    if (typeof config[key] === "undefined") {
      keys.push(key);
    }
  }
  return keys;
}

const getQuestion = name => {
  const confDef = configDef[name];
  if (confDef && confDef.question) {
    const {type = "text", question} = confDef;
    return Object.assign(question, {name, type});
  }
  return null;
}

const getQuestions = names => {
  const questions = [];
  for (let i in names) {
    const name = names[i];
    const question = getQuestion(name);
    if (question !== null) {
      questions.push(question);
    }
  }
  return questions;
}

const transformConfigValues = config => {
  for (let name in config) {
    const transform = (configDef[name]||{}).transform || (x => x);
    config[name] = transform(config[name]);
  }
}

const writeConfig = config => {
  fs.writeFileSync(`${cwd}/config.json`, JSON.stringify(config, null, 3));
  fs.writeFileSync(`${workNg}/config.json`, JSON.stringify({ target: new URL(config.env).origin }));
  const ngConf = JSON.parse(fs.readFileSync(`${workNg}/angular.json`, "utf8"));
  ngConf.$schema = `${cwd}/${ngConf.$schema}`;
  ngConf.projects["exl-cloudapp-sdk-base"].architect.serve.options.port = +config.port;
  fs.writeFileSync(`${workNg}/angular.json`, JSON.stringify(ngConf, null, 3));
}

const checkConfig = async (conf = null) => {
    const config = conf || getConfig();
    const questions = getQuestions(validateConfig(config));
    console.log(questions);
    if (questions.length > 0) {
      console.log();
      const response = await prompts(questions);
      Object.assign(config, response);
    }
    transformConfigValues(config);
    config.name = _.kebabCase(config.title);
    if (validateConfig(config).length > 0) {
      throw new Error("Config is not valid");
    }
    writeConfig(config);
    console.log("\r\nUsing config:");
    console.log(_.pick(config, ['env', 'port']));
    return config;
  }

  const getConfig = () => require(`${cwd}/config.json`)

  module.exports = { checkConfig, getConfig }