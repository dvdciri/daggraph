#!/usr/bin/env node
'use strict';
const Chalk = require('chalk');
const path = require('path');
const Regularity = require('regularity');
const Utils = require('./utils/utils');
const fs = require('fs');
const GraphMapper = require('./graph/GraphMapper')
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
        console.log(Chalk.red('Path is not a directory'));
        process.exit(2);
      } else {
        rootPath = input[0];
      }
    }

    if (!isGradleFolder(rootPath)) {
      console.log(Chalk.red(`This is not a gradle folder`));
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
    .then(compoents => GraphMapper.toBubbleGraph(compoents))
    .then(bubbleGraph => saveBubbleGraph(bubbleGraph));
  }
};

function saveBubbleGraph(bubbleGraph){
  var file_path = path.join(__dirname, 'graph', 'bubble', 'placeholder_index.html');
  const index_content = fs.readFileSync(file_path, 'utf8').replace('JSON_PLACEHOLDER', JSON.stringify(bubbleGraph, null, 2));

  const output_path = path.join('build', 'output', 'dependency_graph.html');
  fs.writeFile(output_path, index_content, function(err) {
    console.log("The graph was saved in "+ process.cwd() +'/'+ output_path);
  }); 
}

function loadModules(searchCriteria){
  return new Promise((resolve, reject) => {
    console.log("Loading modules");

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
    console.log("Loading components");

    const  daggerComponents = [];
    const fileSniffer = FileSniffer.create(searchCriteria);

    fileSniffer.on('match', (path) => {
      const component = new DComponent();
      component.init(path, modules);
      daggerComponents.push(component);
    });
    fileSniffer.on("end", (files) => resolve(daggerComponents));
    fileSniffer.on("error", reject);
    fileSniffer.find(/@Component|@Subcomponent/);
  });
}

function isGradleFolder(rootPath){
  return fs.existsSync(rootPath + 'build.gradle');
}