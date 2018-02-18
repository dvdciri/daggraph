#!/usr/bin/env node
'use strict';

const meow = require('meow');
const router = require('./src/router');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(`
Usage
   
  $ daggraph            # uses current folder path
  $ daggraph <path>     # uses <path>
   
Examples

   $ daggraph /Path/to/android/project
`,
  {
    alias: {
      v: 'version'
    },
    boolean: ['version']
  }
);


router.init(cli.input, cli.flags);
