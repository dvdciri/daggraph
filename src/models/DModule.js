const FS = require('fs');
const Regularity = require('regularity');
const DDependency = require('./DDependency.js');
const Utils = require('./../utils/utils');

function DModule(){
    this.dependencies = [];
}

DModule.prototype.init = function(filePath){
    // Load name
    this.name = Utils.getFilenameFromPath(filePath);
    //Load provided dependencies
    this.dependencies = getProvidedDependencies(filePath);
};

function getProvidedDependencies(path){
    const file = FS.readFileSync(path, 'utf8');
  
    // Match all the dependencies of the module using a regex
    const fullDependencyRegex =  /@\w+\s *(?:protected|public)?\s*(\w+(?:\.\w+)*)\s*provide\w+\s*\(([^\)]*)\)/g;
    const paramRegex = /\s*(\w+)\s*\w+\s*,?\s*/g;

    const matches = file.match(fullDependencyRegex);
    if(matches == null) return [];
 
    // TODO: Get the visibility of each dependency
    const deps = [];
    matches.forEach(element => {
        const moduleDep = new DDependency(element.replace(fullDependencyRegex, "$1"));

        // Get depepdencies of module dependency
        while ((array = paramRegex.exec(element)) !== null) {
            moduleDep.addDependency(new DDependency(array[1]));
        }
        deps.push(moduleDep);
    });

    return deps;
}

module.exports = DModule;