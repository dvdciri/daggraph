import test from 'ava';
import assert from 'assert';
const path = require('path');
const DAGGER_ANALYZER = require('./../../src/dagger/DaggerAnalyzer');

/* start ################################### of java_dagger_defaut tests */

test("GIVEN java sample project WHEN analyze THEN correct components found", t => {
    return DAGGER_ANALYZER.findComponents(path.join(__dirname, "../data/java_dagger_default")).then(components => {
        const expectedComponentsName = ["AppComponent"];

        t.is(components.length, expectedComponentsName.length); 
        components.forEach(c => {
            assert(expectedComponentsName.includes(c.name));
        });
    });
});

test("GIVEN java sample project WHEN analyze THEN correct modules found", t => {
    return DAGGER_ANALYZER.findComponents(path.join(__dirname, "../data/java_dagger_default")).then(components => {
        
        const expectedModulesNames = ["AppModule", "ActivityBuilder", "AndroidSupportInjectionModule"];

        const modules = components[0].modules;
        
        t.is(modules.length, expectedModulesNames.length);
        modules.forEach(m => assert(expectedModulesNames.includes(m.name)));
    });
});

test("GIVEN java sample project WHEN analyze THEN correct dependencies found", t => {
    return DAGGER_ANALYZER.findComponents(path.join(__dirname, "../data/java_dagger_default")).then(components => {
        const modules = components[0].modules;

        const expectedAppModuleDeps = ["Resources", "String", "String"];

        modules.forEach(module => {
            const moduleDeps = module.dependencies;
            switch (module.name) {
                case "AppModule":
                    t.is(moduleDeps.length, expectedAppModuleDeps.length);
                    moduleDeps.forEach(dep => assert(expectedAppModuleDeps.includes(dep.name)));
                    break;
            }
        });
    });
});

/* end ################################### of java_dagger_defaut tests ################################### */

/* start ################################### kotlin_dagger_default tests ###################################*/

test("GIVEN kotlin sample project WHEN analyze THEN correct components found", t => {
    return DAGGER_ANALYZER.findComponents(path.join(__dirname, "../data/kotlin_dagger_default")).then(components => {
        const expectedComponentsName = ["ApplicationComponent"];
      
        t.is(components.length, expectedComponentsName.length); 
        components.forEach(c => assert(expectedComponentsName.includes(c.name)));
    });
});

test("GIVEN kotlin sample project WHEN analyze THEN correct modules found", t => {
    return DAGGER_ANALYZER.findComponents(path.join(__dirname, "../data/kotlin_dagger_default")).then(components => {

        const expectedModulesNames = ["AndroidModule"];
        
        const modules = components[0].modules;
        
        t.is(modules.length, expectedModulesNames.length);
        modules.forEach(m => assert(expectedModulesNames.includes(m.name)));
    });
});

test("GIVEN kotlin sample project WHEN analyze THEN correct dependencies found", t => {
    return DAGGER_ANALYZER.findComponents(path.join(__dirname, "../data/kotlin_dagger_default")).then(components => {
        
        const expectedDeps = ["AndroidModule"];
        expectedDeps["AndroidModule"] = ["Context", "LocationManager", "String", "String"];

        components[0].modules.forEach(module => {
            const moduleDeps = module.dependencies;

            const expDep = expectedDeps[module.name];

            // Check deps size
            t.is(moduleDeps.length, expDep.length);

            // Check deps name
            moduleDeps.forEach(dep => assert(expDep.includes(dep.name)));
        });
    });
});

/* end ################################### kotlin_dagger_default tests ###################################*/