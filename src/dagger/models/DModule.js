const FS = require('fs');
const DDependency = require('./DDependency.js');
const Utils = require('./../../utils/utils');

function DModule(){
    this.dependencies = [];
}

DModule.prototype.init = function(filePath){
    // Load name
    this.name = Utils.getFilenameFromPath(filePath);
    //Load provided dependencies
    this.dependencies = getProvidedDependencies(filePath);
};

function  getProvidedDependencies(path){
    let file = FS.readFileSync(path, 'utf8');
  
    // Match all the dependencies of the module using a regex
    // Group 1: params set if kotlin
    // Group 2: dep name set if kotlin
    // Group 3: dep name set if java
    // Group 4: params set if java
    const fullDependencyRegex = /(?:@Named\s*\("[^"]*"\)\s*)?@Provides(?:(?:\n|.)*?\s+fun\s+.+?\(\s*((?:\n|.)*?)\)\s*:\s*(\w+(?:\.\w+)*)(?:\s+|=)|(?:\n|.)*?\s+(?:static)?\s*(?:protected|public)?\s+(\w*)\s+\w+\s*\(((?:\n|.)*?)\))/;    
    
    // Match the dependencies inside the params of each provided dcependency
    // Group 1: name set if java
    // Group 2: name set if kotlin
    const paramRegex = /(?:\s*(\w+)\s+\w+\s*,?\s*|\s*\w+\s*:\s*(\w+)\s*,?\s*)/;
    const namedRegex = /@Named\(\"([a-zA-Z0-9_ ]*)\"\)/;

    const deps = [];
    while ((fullMatch = fullDependencyRegex.exec(file)) !== null) {

        var dep = (fullMatch[3] !== undefined) ? fullMatch[3] : fullMatch[2];

        // Get dependency name
        file = file.replace(fullDependencyRegex, "");
        const moduleDep = new DDependency(dep);
        
        // Get sub-depepndencies
        let params = (fullMatch[4] !== undefined) ? fullMatch[4] : fullMatch[1];
        if (params !== undefined) {
            while ((paramMatch = paramRegex.exec(params)) !== null) {
                params = params.replace(paramRegex, "");

                var depName = (paramMatch[1] !== undefined) ? paramMatch[1] : paramMatch[2];
                moduleDep.addDependency(new DDependency(depName));
            }
        }
        
        // Look for @Named in the full matcher and add it to the dependency if found
        const namedMatch = namedRegex.exec(fullMatch[0]);
        if(namedMatch !== null && namedMatch[1] !== undefined && namedMatch[1] !== null){
            moduleDep.addNamed(namedMatch[1]);
        }

        deps.push(moduleDep);
    }

    return deps;
}

module.exports = DModule;