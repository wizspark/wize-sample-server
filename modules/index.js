const configuration = require('./config.json');
const debug = require('debug')('wize-sample');

export default async function () {
    const {app, source} = this;
    try {
        let apps=Object.keys(configuration);
        apps.sort((a, b) => configuration[a].priority - configuration[b].priority).forEach(mod => {
            debug(`Initializing module ${mod}`);
            const config = require(`./${mod}/config`);
            const module = require(`./${mod}/index`);

            module.default.call({app, source}, config.default.get());
            debug(`Initialized module ${mod}`);
        });
    } catch (e) {
        console.error(e);
    }
}
