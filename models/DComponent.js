const FS = require('fs');
const Regularity = require('regularity');

function DComponent(){
    this.modules = [];
    this.injections = [];
}

DComponent.prototype.init = function(path){
    // Set file name
    this.name = getFilenameFromPath(path);

    // Load modules
    const file = FS.readFileSync(path, 'utf8');
    var regularity = new Regularity();
    var injectionsRegex = regularity
        .then("inject(")
        .oneOrMore("alphanumeric")
        .global()
        .multiline()
        .done();

    var matches = file.match(injectionsRegex);
    if (matches != null) {
        matches.forEach(element => {
            var injection = element.split('(')[1];
            this.injections.push(injection);
        });
    } else {
        console.log("Couldn't find any result for injection in file " + path);
    }

    // Load injections
    
    console.log(this);
};

function getFilenameFromPath(path){
    return path.split("/").pop().split(".")[0];
}

module.exports = DComponent;