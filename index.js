// Files
const FileHound = require('filehound');
const FileSniffer = require('filesniffer');
// Models
const DModule = require('./models/DModule.js');
const DDependency = require('./models/DDependency.js');
const DComponent = require('./models/DComponent.js');


// TODO: Get root project path from command line

// Find all modules inside the given project root path
const SEARCH_CRITERIA = FileHound.create()
.paths('/Users/dci03/Projects/Work/uma-skyq-android')
.ext('java');

Promise.all([getAllComponents()])
  .then((val) => console.log(JSON.stringify(val[0], null, 2)))
  .catch((msg) => console.log(msg));

/**
 * Scan the files using the SEARCH_CRITERIA looking for content == @Module and return a list of DModule
 */
function getAllModules(){
  return new Promise((resolve, reject) => {
    var daggerModules = [];

    const moduleSniffer = FileSniffer.create(SEARCH_CRITERIA);
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
function getAllComponents(){
  return new Promise((resolve, reject) => {
    var daggerComponents = [];
    
    const componentSniffer = FileSniffer.create(SEARCH_CRITERIA);
    componentSniffer.on('match', (path) => {
      // Create and add the component to the list
      const component =  new DComponent();
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
