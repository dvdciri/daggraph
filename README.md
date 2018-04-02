<p align="center"><a href="https://github.com/dvdciri/daggraph" target="_blank"><img width="200"src="img/icon.png"></a></p>
<h1 align="center">Daggraph</h1>
<p align="center"><a href="http://square.github.io/dagger/" target="_blank">Dagger</a> dependency graph generator for Android Developers</p>
<p align="center">
  <a href="https://travis-ci.org/dvdciri/daggraph"><img src="https://travis-ci.org/dvdciri/daggraph.svg?branch=master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/daggraph"><img src="https://img.shields.io/npm/dt/daggraph.svg" alt="npm"></a>
  <a href="https://www.npmjs.com/package/daggraph"><img src="https://img.shields.io/npm/v/daggraph.svg" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

## Usage
Simple usage:
> daggraph `<folder_path>`

<p align="center">
  <img height="200" src="img/bubble_graph.jpg" />
  <img height="200" src="img/tree_graph.jpg" />
  <img height="200" src="img/linked_node_graph.png" />
</p>

--------

Export raw data:
> daggraph raw `<folder_path>`

## Features
Those are the features that are currently supported and used to build the graph, some of them are work in progress while some other will be picked up at a later stage

| Feature               | Java          | Kotlin  |
| ----------------------|:-------------:|:-------:|
| @Module               |  ✅           |   ✅     |
| @Component            |  ✅           |   ✅     |
| @SubComponent         |  ✅           |   ✅     |
| @Provides             |  ✅           |   ✅     |
| Field @Inject         |  ✅           |   ✅     |
| Constructor @Inject   |  ❌           |   ❌     |
| @Named()              |  ✅           |   ✅     |
| @Binds                |  ❌           |   ❌     |
| Component dependencies|  ❌           |   ❌     |
| Extended modules      |  ❌           |   ❌     |
| ActivityBuilder       |  ❌           |   ❌     |

## Install
```sh
npm install -g daggraph
```

## Help
```
Usage
   
  $ daggraph            # uses current folder path
  $ daggraph <path>     # uses <path>
  $ daggraph raw        # uses current folder path and export the raw data
  $ daggraph raw <path  # uses <path> and export the raw data
   
Examples

   $ daggraph /Path/to/android/project
```

## Contribute
Feel free to contribute by checking out the issues and picking somethig up! 😄 (follow the general opensource <a href="https://opensource.guide/how-to-contribute/">contribution giudelines</a>)

A big shout for the contributions:
- [Matteo Basso](https://github.com/mbasso)
- [César Ferreira](https://github.com/cesarferreira)

## Created by
[Davide Cirillo](https://github.com/dvdciri)

## License
MIT © [Davide Cirillo](https://github.com/dvdciri)
