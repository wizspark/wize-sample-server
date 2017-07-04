import runtime from '@wize/runtime-load-routes';
import crud from '@wize/sequelize-runtime';
import path from "path";
import config from '../config';

export default (app, dirname)=>{
    dirname = dirname || __dirname;
    console.info(`****** Creating api's for dir: ${dirname}`);
    runtime(app, dirname, {
        isAPI: true
    });
    if(checkIfDBSettingsConfigured()) {
        console.info("****** Creating crud api's");
        const dataSource = require('../sources/postgresql').default;
        crud(app, path.join(__dirname, "../", "models"), dataSource);
    }
}

const checkIfDBSettingsConfigured = () => {
    if(config && config.DATABASE &&
        ((config.DATABASE.url && config.DATABASE.url != '') ||
        ((config.DATABASE.name && config.DATABASE.name != ""
        && config.DATABASE.host && config.DATABASE.host != ""
        && config.DATABASE.port && config.DATABASE.port != ""
        && config.DATABASE.dialect && config.DATABASE.dialect != "")))) {
        return true;
    }
    return false;
}