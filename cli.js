#!/usr/bin/env node
'use strict';

const meow = require('meow');
const router = require('./src/router');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(`
Usage

   $ dgraph <command> <params>

   $ dgraph sample <param>             # Uses the <PARAM>
   $ dgraph other <param>              # Other the <PARAM>
   $ dgraph another <param>            # Another the <PARAM>
   
 Examples

   $ dgraph sample TEST                # Uses the TEST
   $ dgraph sample YOLO                # Uses the YOLO
   $ dgraph other YOLO                 # Uses the YOLO
   $ dgraph another YOLO               # Uses the YOLO
`,
  {
    alias: {
      v: 'version'
    },
    boolean: ['version']
  }
);

if (cli.input.length > 0) {
	router.init(cli.input, cli.flags);
} else {
	cli.showHelp(2);
}