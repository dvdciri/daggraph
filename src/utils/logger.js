import Chalk from 'chalk';
const log = console.log;

const LEVEL_NONE = -1
const LEVEL_VERBOSE = 0
const LEVEL_DEFAULT = 1
const LOG_LEVEL = LEVEL_DEFAULT

export function v(msg){
    if (LOG_LEVEL <= LEVEL_VERBOSE) {
        logInternal(msg)
    }
}

export function d(msg){
    if (LOG_LEVEL <= LEVEL_DEFAULT) {
        logInternal(msg)
    }
}

function logInternal(msg) {
    if (LOG_LEVEL != LEVEL_NONE) {
        log(msg)
    }
}