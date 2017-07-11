const configuration = require('./config.json');

export default async function () {
    const {app, source} = this;
    try {
        let apps = Object.keys(configuration);
        apps.sort((a, b) => configuration[a].priority - configuration[b].priority).forEach(async(mod) => {
            console.info(`Initializing module ${mod}`);
            const config = require(`./${mod}/config`);
            const module = require(`./${mod}/index`).default;
            await module.default.call({app, source}, config.default.get());
            if (module.registerEvents) {
                console.info(`Initializing events for ${mod}`);
                await module.registerEvents();
                console.info(`Initialized events for ${mod}`);
            }
            console.info(`Initialized module ${mod}`);
        });
    } catch (e) {
        console.error(e);
    }
}
