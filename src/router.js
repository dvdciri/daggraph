#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const path = require('path');
// Files
const FileHound = require('filehound');
const FileSniffer = require('filesniffer');
// Models
const DModule = require('./models/DModule.js');
const DComponent = require('./models/DComponent.js');
const fs = require('fs');

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

    if (!fs.existsSync(rootPath + 'build.gradle')) {
      log(Chalk.red(`This is not a gradle folder`));
      process.exit(2);
    }

    // Find all modules inside the given project root path
    const searchCriteria = FileHound.create()
      .paths(rootPath)
      // .discard("*build/*")		
      .depth(20)
      .ignoreHiddenDirectories()
      .ignoreHiddenFiles()		
      .ext('java');
    
    getAllModules(searchCriteria)
    .then(m => getAllComponents(searchCriteria, m))
    .then(c =>{
      // TODO: Display graph
    });
  }
};

/**
 * Scan the files using the SEARCH_CRITERIA looking for content == @Module and return a list of DModule
 */
function getAllModules(searchCriteria){
  return new Promise((resolve, reject) => {
    log("Loading modules..");
    
    var daggerModules = [];

    const moduleSniffer = FileSniffer.create(searchCriteria);
    moduleSniffer.on('match', (path) => {
      // Create and add the module to the list
      var module = new DModule();
      module.init(path);
      daggerModules.push(module);
    });
    moduleSniffer.on('end', (filenames) => {
      log('Found ' + filenames.length + ' dagger modules');
      resolve(daggerModules);
    });
    moduleSniffer.on('error', (filename) => {
      reject("Error during searching for module in filename " + filename);
    });
    moduleSniffer.find('@Module');
  });
}

/**
 * Scan the files using the SEARCH_CRITERIA looking for content == @Component and return a list of DComponent
 */
function getAllComponents(searchCriteria, allModules){
  return new Promise((resolve, reject) => {
    log("Loading components..");
    
    var daggerComponents = [];
    
    const componentSniffer = FileSniffer.create(searchCriteria);
    componentSniffer.on('match', (path) => {
      // Create and add the component to the list
      const component = new DComponent();
      component.init(path);
      daggerComponents.push(component);
    });
    componentSniffer.on('end', (filenames) => {
      log('Found ' + filenames.length + ' dagger components');      
      resolve(daggerComponents);
    });
    componentSniffer.on('error', (filename) => {
      reject("Error during searching for component in filename " + filename);
    });
    componentSniffer.find('@Component');
  });
}
