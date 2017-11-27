const FileHound = require('filehound');
const FileSniffer = require('filesniffer');
const FS = require('fs');
const Regularity = require('regularity');

// Models
const DModule = require('./models/DModule.js');
const DDependency = require('./models/DDependency.js');



// TODO: Get root project path from command line

generateGraph('/Users/dci03/Projects/Work/uma-skyq-android');
//createModule('/Users/dci03/Projects/Personal/dgraph/docs/test-module.java');

function generateGraph(url){
  var daggerModules = [];

  // Find all modules inside the given project root path
  const SEARCH_CRITERIA = FileHound.create()
  .paths(url)
  .ext('java');

  const moduleSniffer = FileSniffer.create(SEARCH_CRITERIA);
  moduleSniffer.on('match', (filename) => {
    // Create and add the module to the list
    daggerModules.push(createModule(filename));
  });
  moduleSniffer.on('end', (filenames) => {
    console.log('Found ' + filenames.length + ' dagger modules');

    const componentSniffer = FileSniffer.create(SEARCH_CRITERIA);
    componentSniffer.on('match', (filename) => {
      console.log(filename);
    });
    componentSniffer.on('end', (filename) => {
      console.log('Found ' + filenames.length + ' dagger components');
    });
    componentSniffer.find("@Component");
  });
  moduleSniffer.find('@Module');
}

/**
 * Create a DModule object from the file path of the java module 
 */
function createModule(path){
  const moduleName = getFilenameFromPath(path);
  const newModule = new DModule(moduleName);

  const file = FS.readFileSync(path, 'utf8');
  
  // Match all the dependencies of the module using a regex
  var regularity = new Regularity();
  var myRegexp = regularity
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

  var result = file.match(myRegexp);

  if(result != null){
    result.forEach(element => {
      // This will match something like "protected PinPresenterFactory providePinPresenterFactory("
      var dependencyName = element.split(" ")[1];
      var dependency = new DDependency(dependencyName);
      newModule.addDependency(dependency);
    });
  }else{
    console.log("Couldn't find any dependencies for file "+path)
  }
  // TODO: Get the visibility of each dependency
  // TODO: Get the dependencies of each dependency
  return newModule;
}

function getFilenameFromPath(path){
  return path.split("/").pop().split(".")[0];
}
