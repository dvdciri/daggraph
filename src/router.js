#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const Utils = require('./utils/utils');
const log = console.log;
// Files
const FileHound = require('filehound');
const FileSniffer = require('filesniffer');
// Models
const DModule = require('./models/DModule.js');
const DComponent = require('./models/DComponent.js');
const fs = require('fs');

/**
 * Scan the files using the SEARCH_CRITERIA looking for content == @Module and return a list of DModule
 */
function getAllModules(searchCriteria){
  return new Promise((resolve, reject) => {
    var daggerModules = [];

    const moduleSniffer = FileSniffer.create(searchCriteria);
    moduleSniffer.on('match', (path) => {
      // Create and add the module to the list
      var module = new DModule();
      module.init(path);
      daggerModules.push(module);
    });
    moduleSniffer.on('end', (filenames) => {
      console.log('Found ' + filenames.length + ' dagger modules');
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
function getAllComponents(searchCriteria){
  return new Promise((resolve, reject) => {
    var daggerComponents = [];
    
    const componentSniffer = FileSniffer.create(searchCriteria);
    componentSniffer.on('match', (path) => {
      // Create and add the component to the list
      const component = new DComponent();
      component.init(path);
      daggerComponents.push(component);
    });
    componentSniffer.on('end', (filenames) => {
      resolve(daggerComponents);
    });
    componentSniffer.on('error', (filename) => {
      reject("Error during searching for component in filename " + filename);
    });
    componentSniffer.find('@Component');
  });
}

function gradleFileExists(){
	return fs.existsSync('./build.gradle');
}

// Main code //
const self = module.exports = {
	init: (input, flags) => {

		if (!gradleFileExists()) {
			log(Chalk.red(`This is not a gradle folder`));
			process.exit(2);
		}

		const command = input[0];
		const params = input.subarray(1, input.length);

		// TODO: Get root project path from command line

	// Find all modules inside the given project root path
	const searchCriteria = FileHound.create()
		.paths('./')
		// .discard("*build/*")		
		.depth(15)
		.ignoreHiddenDirectories()
		.ignoreHiddenFiles()		
		.ext('java');

	Promise.all([getAllComponents(searchCriteria), getAllModules(searchCriteria)])
		.then((val) => console.log(JSON.stringify(val, null, 2)))
		.catch((msg) => console.log(msg));


		}
};
