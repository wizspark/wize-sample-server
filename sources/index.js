import globby from 'globby';
import path from 'path';
const debug = require('debug')('wize-sample');

export default async function () {
    const {app, source} = this;
    const paths = globby.sync(['**/index.js', '!index.js'], {
        cwd: __dirname
    }).map(pkg => path.dirname(pkg));
    try {
        for (const s in paths) {
            debug(`Initializing source ${paths[s]}`);
            const dir = paths[s];
            const source = require(`./${dir}/index`);

            source.init.call({app, source});
            debug(`Initialized source ${paths[s]}`);
        }
    } catch (e) {
        console.error(e);
    }
}
