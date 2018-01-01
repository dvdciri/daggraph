// Files
const FILE_HOUND = require('filehound');
const FILE_SNIFFER = require('filesniffer');
const FS = require('fs');
// Models
const DModule = require('./models/DModule.js');
const DComponent = require('./models/DComponent.js');

/**
 * Find and load the dagger components and modules
 * @param {*Path of the android project} projectRootPath 
 */
function findComponents(projectRootPath){
  console.log('Analyzing dagger components and modules..');

  const searchCriteria = FILE_HOUND.create()
    .paths(projectRootPath)
    .discard("build")		
    .depth(20)
    .ignoreHiddenDirectories()
    .ignoreHiddenFiles()
    .ext('.java', '.kt');

  return searchModules(searchCriteria).then(modules => searchComponents(modules, searchCriteria));
}

function searchModules(searchCriteria){
    return new Promise((resolve, reject) => {
      const daggerModules = [];
      const analyzed = []; 
      const fileSniffer = FILE_SNIFFER.create(searchCriteria);
  
      fileSniffer.on("match", (path) => {
        if (analyzed.includes(path)) return;
        analyzed.push(path);

        var module = new DModule();
        module.init(path);
        daggerModules.push(module);
      });
      fileSniffer.on("end", (files) => {
        console.log("Search modules finished with files: " + files);
        resolve(findAndAddInjections(daggerModules, searchCriteria));
      });
      fileSniffer.on("error", (e) => {
        reject("Error while searching for modules "+e);
      });
      fileSniffer.find("@Module");
    });
  }
  
  function searchComponents(modules, searchCriteria){
    return new Promise((resolve, reject) => {

      const daggerComponents = [];
      const analyzed = []; 
      const fileSniffer = FILE_SNIFFER.create(searchCriteria);
  
      fileSniffer.on('match', (path) => {
        if (analyzed.includes(path)) return;
        analyzed.push(path);

        const component = new DComponent();
        component.init(path, modules);
        daggerComponents.push(component);
      });
      fileSniffer.on("end", (files) => {
        console.log("Search components finished with files: " + files);        
        resolve(daggerComponents);
      });
      fileSniffer.on("error", (e) => {
        reject("Error while searching for components " + e);
      });
      fileSniffer.find(/@Component|@Subcomponent/);
    });
  }

  function findAndAddInjections(modules, searchCriteria){
    return new Promise((resolve, reject) => {
        const injectionPathMap = [];

        // Find all the field injections for kotline and java (group 1 java only, group 2 kotlin only) 
        const injectRegex = /(?:(?:@Inject(?:\n|.)*?\s+(?:protected|public|lateinit|(\w+(?:\.\w+)*))?\s+(?:var(?:\n|.)*?:\s*)?)|(?:@field\s*:\s*\[(?:\n|.)*?Inject(?:\n|.)*?\]\s*(?:protected|public|lateinit)?\s*var\s*.+?\s*:\s*))(\w+(?:\.\w+)*)/g;
        const namedRegex = /@*Named\(\"(\w*)\"\)/;
        const fileSniffer = FILE_SNIFFER.create(searchCriteria);

        fileSniffer.on('match', (path) => {
          // Open file
          const file = FS.readFileSync(path, 'utf8');
          // Find injections
          while ((fullMatch = injectRegex.exec(file)) !== null) {
            var depName;
            var depIdentifier;

            // Name Could be at 1 or 3
            if (fullMatch[1] !== undefined && fullMatch[1] !== null) depName = fullMatch[1];
            else depName = fullMatch[2];

            // Look for @Named in the full matcher and add it to the dep identifier
            const namedMatch = namedRegex.exec(fullMatch[0]);
            if(namedMatch !== null){
              depIdentifier = createDependencyIdentifier(depName, namedMatch[1]);
            }else{
              depIdentifier = depName;
            }

            // If the array of paths for that dep is not initialised, init
            if (injectionPathMap[depIdentifier] === undefined) injectionPathMap[depIdentifier] = [];

            // If the path is not already in the list, add it
            if (!injectionPathMap[depIdentifier].includes(path)){
              injectionPathMap[depIdentifier].push(path);
            }
          }
        });
        fileSniffer.on("end", (files) => {
          console.log("Search injection finished with files: " + files);       
          addInjectionsToModules(injectionPathMap, modules);
          resolve(modules);
        });
        fileSniffer.on("error", (e) => {
          reject("Error while searching for injections " + e);
        });
        fileSniffer.find(/@Inject/i);

    });
  }

  function addInjectionsToModules(injectionPathMap, modules){
    modules.forEach(module => {
      module.dependencies.forEach(dep => {
        // Define the identifier base on the name and the named parameter if present
        var depIndentifier = createDependencyIdentifier(dep.name, dep.named);
        
        // If i have some injections for that dependency in the map, add them
        if(injectionPathMap[depIndentifier] !== undefined){
          injectionPathMap[depIndentifier].forEach(path => {
            dep.addInjectionPath(path);
          });
        }
      });
    });
  }

  function createDependencyIdentifier(depName, depNamed){
    var depIndentifier = depName;
    if (depNamed !== undefined && depNamed !== null) depIndentifier = depIndentifier + "**" + depNamed;
    return depIndentifier;
  }

  exports.findComponents = findComponents;