#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const path = require('path');
const Regularity = require('regularity');
const Utils = require('./utils/utils');
const fs = require('fs');
// Files
const FileHound = require('filehound');
const FileSniffer = require('filesniffer');
// Models
const DModule = require('./models/DModule.js');
const DComponent = require('./models/DComponent.js');

// Main code //
const self = module.exports = {
  init: (input, flags) => {

    var rootPath = './';

    // Check for specified path and validate
    if (input[0] !== undefined) {
      if (!fs.lstatSync(input[0]).isDirectory()) {
        log(Chalk.red('Path is not a directory'));
        process.exit(2);
      } else {
        rootPath = input[0];
        log('Using custom path ' + rootPath)
      }
    }

    if (!isGradleFolder()) {
      log(Chalk.red(`This is not a gradle folder`));
      process.exit(2);
    }

    const searchCriteria = FileHound.create()
      .paths(rootPath)
      .discard("build")		
      .depth(20)
      .ignoreHiddenDirectories()
      .ignoreHiddenFiles()
      .ext('java');

    loadModules(searchCriteria)
    .then((modules) => loadComponents(modules, searchCriteria))
    .then(compoents => {
      // TODO: Display stuff now
      console.log(JSON.stringify(compoents, null, 2));
    });
  }
};

function loadModules(searchCriteria){
  return new Promise((resolve, reject) => {
    log("Loading dagger modules..");

    const daggerModules = [];
    const fileSniffer = FileSniffer.create(searchCriteria);

    fileSniffer.on("match", (path) => {
      var module = new DModule();
      module.init(path);
      daggerModules.push(module);
    });
    fileSniffer.on("end", (files) => resolve(daggerModules));
    fileSniffer.on("error", reject);
    fileSniffer.find("@Module");
  });
}

function loadComponents(modules, searchCriteria){
  return new Promise((resolve, reject) => {
    log("Loading dagger components..");

    const  daggerComponents = [];
    const fileSniffer = FileSniffer.create(searchCriteria);

    fileSniffer.on('match', (path) => {
      const component = new DComponent();
      component.init(path, modules);
      daggerComponents.push(component);
    });
    fileSniffer.on("end", (files) => resolve(daggerComponents));
    fileSniffer.on("error", reject);
    fileSniffer.find("@Component");
  });
}


function isGradleFolder(){
  return fs.existsSync(rootPath + 'build.gradle');
}