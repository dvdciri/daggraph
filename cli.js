#!/usr/bin/env node
'use strict';

const meow = require('meow');
const router = require('./src/router');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(`
Usage

   $ daggraph <command> <params>

   $ daggraph sample <param>             # Uses the <PARAM>
   $ daggraph other <param>              # Other the <PARAM>
   $ daggraph another <param>            # Another the <PARAM>
   
 Examples

   $ daggraph sample TEST                # Uses the TEST
   $ daggraph sample YOLO                # Uses the YOLO
   $ daggraph other YOLO                 # Uses the YOLO
   $ daggraph another YOLO               # Uses the YOLO
`,
  {
    alias: {
      v: 'version'
    },
    boolean: ['version']
  }
);


router.init(cli.input, cli.flags);
