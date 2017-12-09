#!/usr/bin/env node
'use strict';
const Chalk = require('chalk');
const path = require('path');
const fs = require('fs');
var Inquirer = require("inquirer");
var sleep = require('sleep');
const DAGGER_ANALYZER = require('./dagger/DaggerAnalyzer');
const GRAPH_MAPPER = require('./graph/GraphMapper')
var EXEC = require('child_process').execSync;



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

    // If is not a gradle folder, stop
    if (!isGradleFolder(rootPath)) {
      console.log(Chalk.red(`This is not a gradle folder`));
      process.exit(2);
    }

    // Scan the folder structure and get the dagger components
    DAGGER_ANALYZER.findComponents(rootPath)
    .then(components => {

      const chartQuestions = [{
        type: "list",
        name: "chart",
        message: "What kind of chart do you want to generate?",
        choices: [
          "Bubble chart"
        ]
      }];

      console.log('\n');
      Inquirer.prompt(chartQuestions)
      .then((answers) =>{

        let fileContent;
        let placeholderPath;
        let fileName;
        if(answers.chart === 'Bubble chart'){
          fileContent = GRAPH_MAPPER.toBubbleGraph(components);
          placeholderPath = path.join(__dirname, 'graph', 'bubble', 'placeholder_index.html');
          fileName = 'dependency_bubble_graph.html';
        }

        createFileAndSave(placeholderPath, fileContent, fileName);
      });
    }).catch(msg => console.log(msg));
  }
};

function createFileAndSave(placeholderPath, fileContent, fileName){
  const index_content = fs.readFileSync(placeholderPath, 'utf8').replace('JSON_PLACEHOLDER', JSON.stringify(fileContent, null, 2));
  const output_path = path.join('build', fileName);
  const absFilePath = path.join(process.cwd(), output_path);
  fs.writeFile(output_path, index_content, function(err) {
    console.log("\nAll done! The chart was saved in "+ absFilePath + ". Opening..");
    sleep.sleep(3);
    EXEC('open ' + absFilePath)
  }); 
}

function isGradleFolder(rootPath){
  return fs.existsSync(rootPath + 'build.gradle');
}