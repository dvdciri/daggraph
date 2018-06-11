#!/usr/bin/env node
import meow from 'meow';
import router from './src/router';
import updateNotifier from 'update-notifier';
import pkg from './package.json';

updateNotifier({ pkg }).notify();

const cli = meow(`
Usage
   
  $ daggraph            # uses current folder path
  $ daggraph <path>     # uses <path>
  $ daggraph raw        # uses current folder path and export the raw data
  $ daggraph raw <path  # uses <path> and export the raw data
   
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
