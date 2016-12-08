#!/usr/bin/env node

import createReporter from './index';

const options = { passed: {}, failed: {} };

const args = process.argv.slice(2);

for(let i = 0; i < args.length; i++){
    const array = args[0].split('=');
    switch(array[0]){
        case 'tag':
            const tag = array[1];
            options.passed.title = `[${tag}] Test passed.`;
            options.failed.title = `[${tag}] Test failed! `;            
            break;
        default:
            break;
    }
}

const reporter = createReporter(options);

process.stdin
  .pipe(reporter)
  .pipe(process.stdout);

process.on('exit', status => {
  if (status === 1 || reporter.isFailed) process.exit(1);
});