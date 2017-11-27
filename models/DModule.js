const FS = require('fs');
const Regularity = require('regularity');

function DModule(){
    this.providedDependencies = [];
}

DModule.prototype.init = (filePath) =>{
    // Load name
    this.name = getFilenameFromPath();
    //Load provided dependencies
    this.providedDependencies = getProvidedDependencies(filePath);
};

function getProvidedDependencies(path){
    var result = [];
    const file = FS.readFileSync(path, 'utf8');
  
    // Match all the dependencies of the module using a regex
    var regularity = new Regularity();
    var dependenciesRegex = regularity
    .oneOf('protected', 'public', '') // it can be package protected
    .maybe('space') // if package protected this is not needed
    .oneOrMore('alphanumeric') // the dependency returned
    .then('space')
    .then('provide') // method name
    .oneOrMore('alphanumeric')
    .then('(')
    .global()
    .multiline()
    .done();
  
    var matches = file.match(dependenciesRegex);
    if(matches != null){
      matches.forEach(element => {
        // This will match something like "protected PinPresenterFactory providePinPresenterFactory("
        var dependencyName = element.split(" ")[1];
        var dependency = new DDependency(dependencyName);
        result.push(dependency);
      });
    }else{
      console.log("Couldn't find any dependencies for file "+path)
    }

    // TODO: Get the visibility of each dependency
    // TODO: Get the dependencies of each dependency

    return result;
}

function getFilenameFromPath(path){
    return path.split("/").pop().split(".")[0];
}

module.exports = DModule;