import test from 'ava';
import path from 'path';
import assert from 'assert';
import DModule from './../../../src/dagger/models/DModule';
import DComponent from './../../../src/dagger/models/DComponent';

// Test data
const kotlinFileComponentPath = path.join(__dirname, "../../data/kotlin_dagger_default/app/src/main/java/org/loop/example/ApplicationComponent.kt");
const javaFileComponentPath = path.join(__dirname, "../../data/java_dagger_default/app/src/main/java/iammert/com/dagger_android_injection/di/AppComponent.java");

/* start ################################### Java ################################### */

test("GIVEN java component WHEN init THEN correct name set", t => {

    // Given
    const component = new DComponent();

    // When
    component.init(javaFileComponentPath, []);

    // Then
    t.is(component.name, "AppComponent");
});

test("GIVEN java component WHEN init THEN correct injections set", t => {
    
    // Given
    const component = new DComponent();

    // When
    component.init(javaFileComponentPath, []);

    // Then
    const injections = component.injections;
    t.is(injections[0], "AndroidSampleApp");
    t.is(injections[1], "DaggerApplication");
});

test("GIVEN java component WHEN init THEN correct modules set", t => {
    
    // Given
    const component = new DComponent();

    // When
    component.init(javaFileComponentPath, getJavaAllModules());

    // Then
    const modules = component.modules;
    t.is(modules[0].name, "AndroidSupportInjectionModule");
    t.is(modules[1].name, "AppModule");
    t.is(modules[2].name, "ActivityBuilder");
});

/* end ################################### Java ################################### */

/* start ################################### Kotlin ################################### */

test("GIVEN kotlin component WHEN init THEN correct name set", t => {
    
    // Given
    const component = new DComponent();

    // When
    component.init(kotlinFileComponentPath, []);

    // Then
    t.is(component.name, "ApplicationComponent");
});

test("GIVEN kotlin component WHEN init THEN correct injections set", t => {
    
    // Given
    const component = new DComponent();

    // When
    component.init(kotlinFileComponentPath, []);

    // Then
    const injections = component.injections;
    t.is(injections[0], "MyApplication");
    t.is(injections[1], "MainActivity");
});

test("GIVEN java component WHEN init THEN correct modules set", t => {
    
    // Given
    const component = new DComponent();

    // When
    component.init(kotlinFileComponentPath, getKotlinAllModules());

    // Then
    const modules = component.modules;
    t.is(modules[0].name, "AndroidModule");
});

/* end ################################### Kotlin ################################### */


function getJavaAllModules(){
    const result = [];
    const allModulesNames = ["AppModule", "ActivityBuilder", "MainActivityModule", "DetailFragmentModule", "DetailActivityModule", "DetailFragmentProvider"];
    
    allModulesNames.forEach(n => {
        const module = new DModule();
        module.name = n;
        result.push(module);
    });
    return result;
}

function getKotlinAllModules(){
    const result = [];
    const allModulesNames = ["AndroidModule"];
    
    allModulesNames.forEach(n => {
        const module = new DModule();
        module.name = n;
        result.push(module);
    });
    return result;
}